const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  data: {
    type: String, // Could be JSON string or a link to where the state is stored
    required: true,
  },
  // Additional canvas fields can be added here
});

const Canvas = mongoose.model("Canvas", canvasSchema);

module.exports = Canvas;
