// Mock API endpoint for login
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Mock validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Mock user data
  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: email,
    role: 'user',
    avatar: null,
    createdAt: new Date().toISOString(),
  };

  // Mock token
  const mockToken = 'mock-jwt-token-' + Date.now();

  res.status(200).json({
    user: mockUser,
    token: mockToken,
    message: 'Login successful',
  });
}
