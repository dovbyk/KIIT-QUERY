const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Start Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const user = await User.findOne({ email: req.user.email });

    if (user) {
      res.redirect("http://localhost:8080/feed");
    } else {
      const { name, email, avatar } = req.user;
      // Pass Google info to frontend to complete registration
      res.redirect(`http://localhost:8080/register?name=${encodeURIComponent(name)}&email=${email}&avatar=${encodeURIComponent(avatar)}`);
    }
  }
);

router.post("/register", async (req, res) => {
  const { rollNumber, name, email, avatar, role, communities } = req.body;

  if (!rollNumber || !name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existing = await User.findById(rollNumber);
    if (existing) {
      return res.status(409).json({ error: "User with that roll number already exists" });
    }

    const user = new User({
      _id: rollNumber,
      name,
      email,
      avatar,
      role,
      communities: Array.isArray(communities) ? communities : [],
      responseCount: 0,
      queryCount: 0,
    });

    const savedUser = await user.save();

    const safeUser = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      avatar: savedUser.avatar,
      role: savedUser.role,
      communities: savedUser.communities,
      responseCount: savedUser.responseCount,
      queryCount: savedUser.queryCount,
    };

    return res.status(201).json(safeUser);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});


// Get currently authenticated user
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:8080");
  });
});

module.exports = router;
