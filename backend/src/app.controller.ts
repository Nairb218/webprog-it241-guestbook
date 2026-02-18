import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages() {
    return this.appService.getMessages();
  }

  @Post()
  addMessage(@Body() body: { name: string; message: string }) {
    return this.appService.addMessage(body.name, body.message);
  }
}