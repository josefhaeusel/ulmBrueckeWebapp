// NestJS server
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = http.createServer(app.getHttpAdapter().getInstance());
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:8080',
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('audio-stream', (data) => {
      socket.broadcast.emit('audio-stream', data);
    });

    socket.on('send-message', (message) => {
      console.log(message);
      socket.broadcast.emit("receive-message", message);  
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(3000, () => {
    console.log('Socket.io server is listening on port 3000');
  });
}
bootstrap()