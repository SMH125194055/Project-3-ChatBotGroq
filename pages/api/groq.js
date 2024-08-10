import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    res.status(200).json(chatCompletion);
  } catch (error) {
    // Log error and send a response with error message
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
