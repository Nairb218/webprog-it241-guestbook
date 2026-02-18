import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor() {
    // REPLACE WITH YOUR ACTUAL SUPABASE URL AND KEY
    this.supabase = createClient(
      'https://gmmocqkvblagdbtgbuzz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbW9jcWt2YmxhZ2RidGdidXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODkwNDYsImV4cCI6MjA4Njk2NTA0Nn0._Jfd-rvZHsLcfPlmc8lt9XVrJAm7BI86-Q1SVj5FBbI'
    );
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async addMessage(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select();

    if (error) throw error;
    return data;
  }
}