import { Server as SocketIOServer } from 'socket.io';

export function setupSocketHandlers(io: SocketIOServer) {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join user-specific room
    socket.on('join-user-room', (userId: string) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Handle workstation status updates
    socket.on('workstation-status', (data) => {
      socket.to(`user-${data.userId}`).emit('workstation-update', data);
    });

    // Handle model training updates
    socket.on('model-training', (data) => {
      socket.to(`user-${data.userId}`).emit('model-update', data);
    });

    // Handle pipeline execution updates
    socket.on('pipeline-execution', (data) => {
      socket.to(`user-${data.userId}`).emit('pipeline-update', data);
    });

    // Handle code execution updates
    socket.on('code-execution', (data) => {
      socket.to(`user-${data.userId}`).emit('code-update', data);
    });

    // Handle chat messages
    socket.on('chat-message', (data) => {
      socket.to(`user-${data.userId}`).emit('chat-response', data);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}