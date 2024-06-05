import jwt from 'jsonwebtoken';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId}, 'your_secret_key', { expiresIn: '3h'});
}