import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const API_KEY = process.env.GROQ_API_KEY; // Use environment variable for security

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

app.use(limiter);

// Initialize Groq instance
const groq = new Groq({
  apiKey: API_KEY,
});

app.post('/api/groq', async (req, res) => {
  const { messages, model } = req.body;

  // Validate input
  if (!messages || !model) {
    return res.status(400).json({ error: 'Messages and model parameters are required' });
  }

  // Define parameters for chat completion
  const params = {
    messages,
    model,
  };

  try {
    // Make the API call to create chat completion
    const chatCompletion = await groq.chat.completions.create(params);

    // Check if response is empty or undefined
    if (!chatCompletion) {
      console.error('Error from API: No response received');
      return res.status(500).json({ error: 'Error from API: No response received' });
    }

    // Send the response back to the client
    res.json(chatCompletion);
  } catch (error) {
    // Log error and send a response with error message
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
