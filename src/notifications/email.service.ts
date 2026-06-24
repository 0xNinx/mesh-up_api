import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTargetedMail(
    email: string,
    name: string,
    eventType: string,
    data: Record<string, any>,
  ) {
    const unsubLink = `https://drips.io/settings/unsubscribe?email=${encodeURIComponent(email)}&type=${eventType}`;
    const consolidatedContext = { ...data, recipientName: name, unsubscribeUrl: unsubLink };

    let subject = 'Drips Network Platform Update Notification';
    let templateName = 'generic';

    switch (eventType) {
      case 'onComment':
        subject = '💬 Someone commented on your solution thread';
        templateName = 'comment';
        break;
      case 'onRanked':
        subject = '🏆 Congratulations! Your solution rank shifted position';
        templateName = 'ranked';
        break;
      case 'onNewSolution':
        subject = '💡 New solution submitted to your problem statement';
        templateName = 'new-solution';
        break;
      case 'weeklyDigest':
        subject = '🚀 Drips Weekly Digest: Top engineering architectural problems';
        templateName = 'weekly-digest';
        break;
    }

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: `./${templateName}`,
      context: consolidatedContext,
    });
  }
}