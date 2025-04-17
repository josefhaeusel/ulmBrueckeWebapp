import { Controller, Post, Body } from '@nestjs/common';
import { HeartbeatService } from './heartbeat.service';

interface HeartbeatDto {
  id: string;
  timestamp: string;
}

@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) { }

  @Post()
  receiveHeartbeat(@Body() heartbeat: HeartbeatDto) {
    const id = heartbeat.id;
    const timestamp = heartbeat.timestamp;

    this.heartbeatService.recordHeartbeat(id, timestamp);
    return { message: `Heartbeat received ${id} ${timestamp}` };
  }
}