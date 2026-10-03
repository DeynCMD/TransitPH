import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovzsbglfnxehiynbiqeo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92enNiZ2xmbnhlaGl5bmJpcWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NTAxNDcsImV4cCI6MjEwNjIyNjE0N30.ZGicZ8VuGKELiFlBNK_xEeux0uPC-WjutXvhw-F4tto';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
