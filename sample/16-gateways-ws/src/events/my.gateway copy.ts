import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8081)
export class MyGateway {
  database = {
    chart: [
      {
        start: 2300,
        end: 2000,
      },
      {
        start: 2200,
        end: 2000,
      },
    ],
  };
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): WsResponse<Object> {
    return { event: 'events', data: this.database };
  }

  @SubscribeMessage('publish')
  publish(me: any, data: any) {
    data = JSON.parse(data);
    for (const client of this.server.clients) {
      client.send(
        JSON.stringify({
          event: 'events',
          data: this.database,
        }),
      );
    }
  }
}
