import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { RoutingKeys } from 'src/enums/routing-keys.enum';

@Injectable()
export class RmqService {
  private readonly configService = new ConfigService();
  constructor() {}

  getOptions(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')],
        queue: RoutingKeys.NOTIFICATION_SERVICE,
        noAck: false,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
