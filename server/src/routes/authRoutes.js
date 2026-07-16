const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { env } = require("../config/env");
const { prisma } = require("../config/prisma");

const router = express.Router();

router.post("/login", async (request, response) => {
  const schema = z.object({
    email: z.string().min(2),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse(request.body);

  const adminUser = await prisma.adminUser.findFirst({
    where: {
      OR: [{ email }, { username: email }],
    },
  });

  if (!adminUser) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, adminUser.passwordHash);

  if (!passwordMatches) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
    },
    env.jwtSecret,
    { expiresIn: "8h" },
  );

  response.json({
    token,
    user: {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
    },
  });
});

module.exports = { authRoutes: router };

