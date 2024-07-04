import { IOneEmail } from './email-interface';

interface IEmailProvider {
  sendMail(payload: IOneEmail): any;
}

export default IEmailProvider;
