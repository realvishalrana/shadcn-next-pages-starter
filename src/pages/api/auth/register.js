// Mock API endpoint for user registration
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, password } = req.body;

  // Mock validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Mock response
  res.status(201).json({
    message:
      'User registered successfully. Please check your email to verify your account.',
    user: {
      id: '1',
      firstName,
      lastName,
      email,
    },
  });
}
