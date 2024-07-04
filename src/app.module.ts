import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppContainer } from './enums/app.container.enum';
import { NotificationController } from './modules/notification/notification.controller';
import { NotificationService } from './modules/notification/notifications.service';
import { RmqService } from './modules/rabbitmq/rabbitmq.service';
import { NodeMailerProvider } from './providers/nodemailer.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SENDER_NAME: Joi.string().required(),
        SENDER_EMAIL: Joi.string().required(),
        NODEMAILER_USER: Joi.string().required(),
        NODEMAILER_PASSWORD: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController, NotificationController],
  providers: [
    AppService,
    NotificationService,
    RmqService,
    {
      provide: AppContainer.EMAIL_PROVIDER,
      useClass: NodeMailerProvider,
    },
  ],
})
export class AppModule {}
