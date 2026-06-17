import { io } from 'socket.io-client';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = 'super-secret'; // Same as in AuthModule
const SERVER_URL = 'http://localhost:3000';
const PROBLEM_ID = '123';

const token = sign({ sub: 'user_1', username: 'test_user' }, JWT_SECRET);

console.log('Connecting to WebSocket server...');
const socket = io(SERVER_URL, {
  auth: { token },
});

socket.on('connect', () => {
  console.log('Connected! Socket ID:', socket.id);

  console.log(`Joining problem room: ${PROBLEM_ID}`);
  socket.emit('join-problem', { problemId: PROBLEM_ID });
});

socket.on('users-viewing', (data) => {
  console.log('Users viewing update:', data);
});

socket.on('typing-indicator', (data) => {
  console.log('Typing indicator received:', data);
});

socket.on('solution.created', (solution) => {
  console.log('New solution posted!', solution);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Simulate typing after 2 seconds
setTimeout(() => {
  console.log('Sending typing indicator...');
  socket.emit('typing', { problemId: PROBLEM_ID, isTyping: true });
}, 2000);

// Simulate stopping typing after 4 seconds
setTimeout(() => {
  console.log('Stopping typing indicator...');
  socket.emit('typing', { problemId: PROBLEM_ID, isTyping: false });
}, 4000);
