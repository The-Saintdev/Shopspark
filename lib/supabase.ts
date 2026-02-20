// import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ovyfonraqmpufrbtfglp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mLccq1nylHNoLXz1a8SO9g_fXPG-0xk";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);
