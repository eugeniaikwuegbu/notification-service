import { Inject } from '@nestjs/common';
import { AppContainer } from 'src/enums/app.container.enum';
import { IOneEmail } from 'src/interfaces/email-interface';
import IEmailProvider from 'src/interfaces/email-provider.interface';

export class NotificationService {
  constructor(
    @Inject(AppContainer.EMAIL_PROVIDER)
    private readonly mailProvider: IEmailProvider,
  ) {}

  async sendOneEmail(payload: IOneEmail) {
    return this.mailProvider.sendMail(payload);
  }
}
