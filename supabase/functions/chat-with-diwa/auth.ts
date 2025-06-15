
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

export async function authenticateUser(authHeader: string | null, supabaseUrl: string, serviceKey: string) {
  if (!authHeader) {
    throw new Error('Authorization required');
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    console.log('Auth error:', authError);
    throw new Error('Invalid or expired token');
  }

  console.log('User authenticated:', user.email);
  return user;
}
