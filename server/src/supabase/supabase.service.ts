import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

@Injectable()
export class SupabaseService {
    private client: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error(
                'Missing SUPABASE_URL or SUPABASE_KEY environment variables.',
            );
        }

        this.client = createClient(supabaseUrl, supabaseKey);
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}
