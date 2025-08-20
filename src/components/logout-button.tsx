"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import useSession from "@/lib/supabase/use-session";

export default function LogoutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!session) {
    return;
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
