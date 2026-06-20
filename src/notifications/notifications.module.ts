import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { NotificationsService } from './notifications.service';
import { EmailService } from './email.service';
import { EmailProcessor } from './processors/email.processor';

@Global()
@Module({
  imports: [
    // Register background async task workers handling outbound SMTP spikes safely
    BullModule.registerQueue({
      name: 'email-dispatch',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10) || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"Drips Engine" <${process.env.EMAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NotificationsService, EmailService, EmailProcessor],
  exports: [NotificationsService],
})
export class NotificationsModule {}