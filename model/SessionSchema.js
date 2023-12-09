const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  canvasState: {
    type: String, // This could be a reference to a Canvas model if the state is complex
    required: false, // Only required when there is an ongoing session with a state
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Additional session fields can be added here
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
