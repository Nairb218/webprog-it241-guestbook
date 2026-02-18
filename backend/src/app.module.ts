import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { GuestbookController } from './guestbook.controller';

@Module({
  imports: [],
  controllers: [GuestbookController],
  providers: [SupabaseService],
})
export class AppModule {}
