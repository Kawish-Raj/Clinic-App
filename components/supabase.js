import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qiabcdpgczndotliyyxm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r_f_YsI0lqf0m8xr9uZO9Q_MweADSWC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);