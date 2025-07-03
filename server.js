const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');  // To interact with the file system
const moment = require('moment');  // To handle date manipulation

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all connections (for testing)
    methods: ["GET", "POST"]
  }
});

// Path to the JSON file where promotions are stored
const promotionsFilePath = './promotions.json';

// Read promotions from the file
const readPromotionsFromFile = () => {
  try {
    const data = fs.readFileSync(promotionsFilePath, 'utf8');
    return JSON.parse(data);  // Parse and return promotions
  } catch (error) {
    console.error('Error reading promotions from file:', error);
    return [];
  }
};

// Filter active promotions based on the current date
const getActivePromotions = () => {
  const currentDate = moment(); // Get current date using moment.js
  const promotions = readPromotionsFromFile();  // Read promotions from file
  
  // Filter promotions that are active (i.e., current date is within startDate and endDate)
  return promotions.filter(promo => {
    const startDate = moment(promo.startDate);
    const endDate = moment(promo.endDate);
    return currentDate.isBetween(startDate, endDate, null, '[]'); // '[]' means inclusive range
  });
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  let index = 0;

  // Get active promotions
  const activePromotions = getActivePromotions(); // Get the active promotions based on current date

  // Send active promotions every 2 minutes (120000 milliseconds)
  const intervalId = setInterval(() => {
    if (activePromotions.length > 0) {
      socket.emit('promotion', activePromotions[index].message); // Emit promotion to the client
      console.log('Sending promotion:', activePromotions[index].message);
      index = (index + 1) % activePromotions.length; // Cycle through active promotions
    }
  }, 120000); // Send every 2 minutes (120,000 ms)

  // Clean up when the client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(intervalId); // Stop emitting promotions when the client disconnects
  });
});

server.listen(4000, () => {
  console.log('Promo server running on http://10.0.2.2:4000');
});
