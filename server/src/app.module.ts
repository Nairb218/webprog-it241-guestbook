import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
    imports: [SupabaseModule, GuestbookModule],
})
export class AppModule { }
