const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const postsFile = path.join(__dirname, "posts.json");
const subscribersFile = path.join(__dirname, "subscribers.json");

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "PTO Blog API is running 🚀",
  });
});

// GET All Blog Posts
app.get("/api/posts", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsFile, "utf8"));
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch blog posts",
    });
  }
});

// POST Newsletter Subscription
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;

  // Validate email exists
  if (!email) {
    return res.status(400).json({
      status: 400,
      message: "Email is required",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid email format",
    });
  }

  try {
    let subscribers = [];

    if (fs.existsSync(subscribersFile)) {
      subscribers = JSON.parse(
        fs.readFileSync(subscribersFile, "utf8")
      );
    }

    // Prevent duplicate emails
    const exists = subscribers.find(
      (subscriber) =>
        subscriber.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return res.status(409).json({
        status: 409,
        message: "Email already subscribed",
      });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    });

    fs.writeFileSync(
      subscribersFile,
      JSON.stringify(subscribers, null, 2)
    );

    res.status(200).json({
      status: 200,
      message: "Subscription successful",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});