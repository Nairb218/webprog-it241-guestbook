import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private supabaseService: SupabaseService) {}

  @Get()
  async getPosts() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  }

  @Post()
  async createPost(@Body() body: { name: string; message: string }) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('posts')
      .insert([body]);

    if (error) throw error;

    return data;
  }
}