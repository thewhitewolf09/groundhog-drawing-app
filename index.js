const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Instantiate Socket.IO server
dotenv.config({ path: "./.env" });

// Database Connection (MongoDB with Mongoose)
require("./db/connection.js");

// CORS Configuration
const corsOptions = {
  origin: ["https://groundhog.netlify.app"],
  // origin: ["http://localhost:3000", "https://groundhog.netlify.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());




// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Serve static files from the React app
// app.use(express.static(path.resolve(__dirname, "Client", "build")));

// // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
// });


// API Routes
app.use("/api/v1", require("./router/main.js"));

// WebSocket setup for real-time collaboration
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Handle joining a session
  socket.on('joinSession', (sessionId) => {
      socket.join(sessionId);
      console.log(`User ${socket.id} joined session ${sessionId}`);
  });

  // Handle drawing action
  socket.on('draw', (data) => {
      socket.to(data.sessionId).emit('drawing', data); // Broadcast drawing data to all clients in the same session except the sender
  });

  // Handle disconnect
  socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
