import Groq from 'groq-sdk';

export default async function handler(req, res) {
  const API_KEY = process.env.GROQ_API_KEY; // Use environment variable for security

  const groq = new Groq({
    apiKey: API_KEY,
  });

  const { messages, model } = req.body;

  if (req.method === 'POST') {
    if (!messages || !model) {
      return res.status(400).json({ error: 'Messages and model parameters are required' });
    }

    try {
      const chatCompletion = await groq.chat.completions.create({ messages, model });
      if (!chatCompletion) {
        return res.status(500).json({ error: 'Error from API: No response received' });
      }
      res.status(200).json(chatCompletion);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
