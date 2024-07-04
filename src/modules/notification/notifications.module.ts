import { Module } from '@nestjs/common';
import { AppContainer } from 'src/enums/app.container.enum';
import { NodeMailerProvider } from 'src/providers/nodemailer.provider';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notifications.service';

@Module({
  providers: [
    {
      provide: AppContainer.EMAIL_PROVIDER,
      useClass: NodeMailerProvider,
    },
    NotificationService,
  ],
  imports: [],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationsModule {}
