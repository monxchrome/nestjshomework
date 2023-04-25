import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import * as process from 'process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.SMTP_EMAIL_SERVER,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: path.join(__dirname, '..', '..', '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class AppModule {}
