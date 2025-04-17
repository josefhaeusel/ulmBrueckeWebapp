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
        this.heartbeats.set(ip, Date.now());
        this.logger.debug(`Heartbeat from ${ip} sent at ${timestamp}`);
        if (process.env.PROD == "false") {
            this.sendEmail(ip)
        }
    }

    private checkHeartbeats() {
        const now = Date.now();
        for (const [ip, lastSeen] of this.heartbeats.entries()) {
            const diffSeconds = (now - lastSeen) / 1000;
            this.logger.debug(`Checking Heartbeat... \n -> Time since last one: ${diffSeconds}s`)
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

        const rawMailList = process.env.MAIL_RECIPIENTS;
        const recipients = rawMailList?.split(',').map(email => email.trim()) || [];

        const mailOptions = {
            from: process.env.GMAIL_USER_FROM,
            to: recipients,
            subject: `[SCB] 🚨 System Report`,
            text: `${new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin" })}: No heartbeat received from PC User ${ip} in the last ${this.timeoutSeconds} seconds.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            this.logger.log(`Email sent to ${recipients} missing heartbeat: ${ip}`);
        } catch (err) {
            this.logger.error(`Failed to send email: ${err}`);
        }
    }
}