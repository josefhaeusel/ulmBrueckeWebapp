import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HeartbeatModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
