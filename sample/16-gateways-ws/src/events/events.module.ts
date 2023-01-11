import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MyGateway } from './my.gateway copy';

@Module({
  providers: [EventsGateway, MyGateway],
})
export class EventsModule {}
