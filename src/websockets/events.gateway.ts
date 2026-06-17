import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);
  private readonly problemViewers = new Map<string, Set<string>>();

  constructor(private readonly authService: AuthService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
    
    if (!token) {
      this.logger.log(`Client disconnected: No token provided (${client.id})`);
      client.disconnect();
      return;
    }

    const payload = await this.authService.validateToken(token);
    if (!payload) {
      this.logger.log(`Client disconnected: Invalid token (${client.id})`);
      client.disconnect();
      return;
    }

    client.data.user = payload;
    this.logger.log(`Client connected: ${client.id} (User: ${payload.sub || payload.id})`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Clean up problem viewers tracking
    this.problemViewers.forEach((viewers, problemId) => {
      if (viewers.has(client.id)) {
        viewers.delete(client.id);
        this.broadcastUserCount(problemId);
      }
    });
  }

  @SubscribeMessage('join-problem')
  handleJoinProblem(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { problemId: string },
  ) {
    const { problemId } = data;
    const roomName = `problem:${problemId}`;
    
    client.join(roomName);
    
    if (!this.problemViewers.has(problemId)) {
      this.problemViewers.set(problemId, new Set());
    }
    this.problemViewers.get(problemId).add(client.id);

    this.logger.log(`User ${client.id} joined problem ${problemId}`);
    this.broadcastUserCount(problemId);
  }

  @SubscribeMessage('leave-problem')
  handleLeaveProblem(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { problemId: string },
  ) {
    const { problemId } = data;
    const roomName = `problem:${problemId}`;
    
    client.leave(roomName);
    
    if (this.problemViewers.has(problemId)) {
      this.problemViewers.get(problemId).delete(client.id);
      this.broadcastUserCount(problemId);
    }

    this.logger.log(`User ${client.id} left problem ${problemId}`);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { problemId: string; isTyping: boolean },
  ) {
    const { problemId, isTyping } = data;
    const roomName = `problem:${problemId}`;
    
    client.to(roomName).emit('typing-indicator', {
      userId: client.data.user.sub || client.data.user.id,
      username: client.data.user.username || 'Anonymous',
      isTyping,
    });
  }

  // External trigger for new solutions (e.g. from SolutionsService)
  @SubscribeMessage('solution.created.internal') // Just for demo/internal use if needed
  emitSolutionCreated(problemId: string, solution: any) {
    const roomName = `problem:${problemId}`;
    this.server.to(roomName).emit('solution.created', solution);
  }

  // Real-time notifications
  emitNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  private broadcastUserCount(problemId: string) {
    const count = this.problemViewers.get(problemId)?.size || 0;
    this.server.to(`problem:${problemId}`).emit('users-viewing', {
      problemId,
      count,
    });
  }
}
