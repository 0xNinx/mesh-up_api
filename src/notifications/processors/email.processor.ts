import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email.service';
import { Logger } from '@nestjs/common';

@Processor('email-dispatch')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('send-event-email')
  async handleEmailDispatch(job: Job) {
    const { recipientEmail, recipientName, eventType, templateData } = job.data;
    this.logger.log(`Processing asynchronous payload dispatch channel targeting user: ${recipientEmail}`);

    try {
      await this.emailService.sendTargetedMail(recipientEmail, recipientName, eventType, templateData);
    } catch (err) {
      this.logger.error(`Critical drop encountered firing off SMTP payloads sequence: ${err.message}`);
      throw err; // Forces job retry state handling structures internally via BullMQ parameters
    }
  }
}