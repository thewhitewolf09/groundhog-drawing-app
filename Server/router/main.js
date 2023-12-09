const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controller/userController");

const {
  createSession,
  joinSession,
  leaveSession,
  getSessionDetails,
  saveCanvasState,
  loadCanvasState,
} = require("../controller/sessionController");

const { authenticate } = require("../middleware/authenticate");

//---------------------------------------------------
//------------------ User API -----------------------
//---------------------------------------------------

// Register a new user
router.route("/register").post(registerUser);

// User login
router.route("/login").post(loginUser);

// User logout
router.route("/logout").get(logoutUser);

// Get user profile
router.route("/user/profile").get(authenticate, getUserProfile);

// Update user profile
router.route("/user/profile").put(authenticate, updateUserProfile);

//---------------------------------------------------
//------------------ Session API --------------------
//---------------------------------------------------

// Create a new drawing session
router.route("/session/create").post(authenticate, createSession);

// Join an existing drawing session
router.route("/session/join/:sessionId").post(authenticate, joinSession);

// Leave a drawing session
router.route("/session/leave/:sessionId").post(authenticate, leaveSession);

// Get details of a drawing session
router.route("/session/:sessionId").get(authenticate, getSessionDetails);

// Save canvas state
router.route("/canvas/save/:sessionId").post(authenticate, saveCanvasState);

// Load canvas state
router.route("/canvas/load/:sessionId").get(authenticate, loadCanvasState);

module.exports = router;
