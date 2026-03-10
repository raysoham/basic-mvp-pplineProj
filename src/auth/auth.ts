import { Router } from 'express';
import jwt from 'jsonwebtoken';

const authRouter = Router();

const DEMO_USER = {
  id: 1,
  username: 'demo',
  password: 'password123'
};

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ error: 'JWT_SECRET is not configured' });
  }

  const token = jwt.sign({ sub: DEMO_USER.id, username: DEMO_USER.username }, secret, {
    expiresIn: '1h'
  });

  return res.json({ token });
});

export { authRouter };

