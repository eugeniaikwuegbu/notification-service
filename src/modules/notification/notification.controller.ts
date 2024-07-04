import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationEvents } from 'src/enums/events';
import { IOneEmail } from 'src/interfaces/email-interface';
import { RmqService } from '../rabbitmq/rabbitmq.service';
import { NotificationService } from './notifications.service';

@Controller('notification-controller')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,

    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(NotificationEvents.SINGLE_EMAIL)
  async sendOneEmail(@Payload() data: IOneEmail, @Ctx() context: RmqContext) {
    try {
      this.logger.log(
        'NotificationController :: sendOneEmail :: payload %o',
        JSON.stringify(data),
      );

      await this.notificationService.sendOneEmail(data);
      this.logger.log('Single Email Delivered Successfully ');
    } catch (error) {
      this.logger.error(
        'NotificationController :: sendOneEmail error %o',
        error,
      );
    } finally {
      this.rmqService.ack(context);
    }
  }
}
