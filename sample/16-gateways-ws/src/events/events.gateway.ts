import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  database = {
    sell: [
      {
        unit_price: 2060,
        orderQuantity: 178,
      },
    ],
    buy: [
      {
        unit_price: 10,
        orderQuantity: 1,
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
    this.database.buy.push(data.data);
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
