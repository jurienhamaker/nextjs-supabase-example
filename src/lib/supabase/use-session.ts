"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "./browser-client";
import { Session } from "@supabase/supabase-js";

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => setSession(session));

    return () => subscription.unsubscribe();
  }, []);

  return session;
}
