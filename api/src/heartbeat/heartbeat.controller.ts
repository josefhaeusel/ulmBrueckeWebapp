import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { HeartbeatService } from './heartbeat.service';

@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Post()
  receiveHeartbeat(@Req() req: Request) {
    const ip = req.ip;
    this.heartbeatService.recordHeartbeat(ip);
    return { message: 'Heartbeat received' };
  }
}