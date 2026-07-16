const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    request.user = payload;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Session expired" });
  }
}

module.exports = { requireAuth };

