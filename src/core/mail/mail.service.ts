import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  send(
    to: string,
    subject: string,
    template: string,
    templateData?: any,
  ): Promise<SentMessageInfo> {
    return this.mailService.sendMail({
      to,
      subject,
      template,
      context: templateData,
    });
  }
}
