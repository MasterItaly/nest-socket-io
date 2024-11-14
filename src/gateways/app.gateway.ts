import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayEventEnum } from '../enums/gateway-event.enum';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(AppGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: any, ...args: any[]): void {
    this.logger.log(`Connection - Client: ${client.id}`);
    this.logger.log(`Connection - Args: ${JSON.stringify(args, null, 2)}`);
  }

  handleDisconnect(client: any): void {
    this.logger.log(`Disconnect - Client: ${client.id}`);
  }

  @SubscribeMessage(GatewayEventEnum.MESSAGE)
  handleMyEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(
      `Message from Client ${client.id}: ${JSON.stringify(data, null, 2)}`,
    );
    this.server.emit(GatewayEventEnum.MESSAGE, {
      response: data,
      data,
    });
  }
}
