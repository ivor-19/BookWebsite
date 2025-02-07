import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  email: string;
}

interface DecodedToken {
  id: string;
  email: string;
  iat: number; // "Issued At" time
  exp: number; // Expiration time
}

// Function to generate token
const generateToken = (user: User): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Function to verify token
const verifyToken = (token: string): DecodedToken => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Return the decoded token if valid
    return decoded;
  } catch (error) {
    // Handle invalid or expired token
    throw new Error("Invalid or expired token");
  }
};

export { generateToken, verifyToken };
