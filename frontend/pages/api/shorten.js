import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const backendUrl = 'http://host.docker.internal:5000';
      const response = await axios.post(`${backendUrl}/`, req.body);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      res.status(500).json({ error: 'Failed to shorten URL' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}