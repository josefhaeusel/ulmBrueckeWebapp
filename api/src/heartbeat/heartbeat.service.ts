import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class HeartbeatService {
    private readonly logger = new Logger(HeartbeatService.name);
    private readonly heartbeats = new Map<string, number>();
    private readonly timeoutSeconds = 120;

    constructor() {
        // Start monitor loop
        setInterval(() => this.checkHeartbeats(), 60000); // every 60 sec
    }

    recordHeartbeat(ip, timestamp) {
        this.heartbeats.set(ip, timestamp);
        this.logger.debug(`Heartbeat from ${ip} sent at ${timestamp}`);
        if (process.env.PROD == "false") {
            this.sendEmail(ip)
        }
    }

    private checkHeartbeats() {
        const now = Date.now();
        for (const [ip, lastSeen] of this.heartbeats.entries()) {
            const diffSeconds = (now - lastSeen) / 1000;
            if (diffSeconds > this.timeoutSeconds) {
                this.logger.warn(`No heartbeat from ${ip} in ${diffSeconds}s`);
                this.sendEmail(ip);
                this.heartbeats.delete(ip);
            }
        }
    }

    private async sendEmail(ip: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.GMAIL_USER_FROM,
                pass: process.env.GMAIL_PASS,
            },
        });


        const mailOptions = {
            from: process.env.GMAIL_USER_FROM,
            to: process.env.GMAIL_USER_TO,
            subject: `[SCB] 🚨 System Report`,
            text: `${new Date().toISOString()}: No heartbeat received from IP ${ip} in the last ${this.timeoutSeconds} seconds.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            this.logger.log(`Email sent to ${process.env.GMAIL_USER_TO} missing heartbeat: ${ip}`);
        } catch (err) {
            this.logger.error(`Failed to send email: ${err}`);
        }
    }
}