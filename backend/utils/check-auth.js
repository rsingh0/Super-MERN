import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";


const authorize = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        // Returns same payload, that was used during jwt.sign
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};

const generateToken = (user) => {

  const SECRET_KEY = process.env.SECRET_KEY || "abc123"

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    }, 
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export { authorize, generateToken };
