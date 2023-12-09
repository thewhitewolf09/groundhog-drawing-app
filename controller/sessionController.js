const Session = require("../model/SessionSchema"); // Replace with your Session model
const Canvas = require("../model/CanvasSchema"); // Replace with your Canvas model

exports.createSession = async (req, res) => {
    try {
      const { name, createdBy } = req.body;
      const newSession = new Session({ name, createdBy });
      await newSession.save();
      res.status(201).json(newSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.joinSession = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { userId } = req.body; // Assuming userId is passed in the request body
  
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Add the user to the session's participants list
      session.participants.push(userId);
      await session.save();
  
      res.json({ message: "Joined session successfully", session });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.leaveSession = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { userId } = req.body; // Assuming userId is passed in the request body
  
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Remove the user from the session's participants list
      session.participants = session.participants.filter(participant => participant.toString() !== userId);
      await session.save();
  
      res.json({ message: "Left session successfully", session });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.getSessionDetails = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await Session.findById(sessionId).populate('participants', 'username');
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.saveCanvasState = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { canvasData } = req.body; // Assuming canvas data is passed in request body
  
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Save canvas state
      session.canvasState = canvasData;
      await session.save();
  
      res.json({ message: "Canvas state saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.loadCanvasState = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Return the saved canvas state
      res.json({ canvasState: session.canvasState });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
