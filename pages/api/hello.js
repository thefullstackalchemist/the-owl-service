// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // Check if the method is GET (or any other method you'd like to handle)
  if (req.method === 'GET') {
    res.status(200).json({ status: 'ok' , message: 'Hello from healthy API!' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
