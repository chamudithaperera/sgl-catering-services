const path = require("path");
const cors = require("cors");
const express = require("express");
const { env } = require("./config/env");
const { authRoutes } = require("./routes/authRoutes");
const { publicRoutes } = require("./routes/publicRoutes");
const { adminRoutes } = require("./routes/adminRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientUrls.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`SGL API listening on http://localhost:${env.port}`);
});
