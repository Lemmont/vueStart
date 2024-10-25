import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  // get token from request header
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (token == null) {
    return res.status(401).json({
      error: "Authentication failed",
    });
  }

  // verify token
  jwt.verify(token, "kaas213", (error, user) => {
    // check if there is a refresh token in the cookie
    if (error) {
      return res.status(403).json({
        error: "Authentication failed",
        message: error,
      });
    }

    req.user = user;

    next();
  });
}
