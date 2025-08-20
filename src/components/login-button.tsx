"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Button } from "./button";
import useSession from "@/lib/supabase/use-session";

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();
  const session = useSession();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          props.nextUrl || ""
        }`,
        scopes: [
          "user-read-email",
          "playlist-modify-private",
          "playlist-read-private",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
        ].join(" "),
      },
    });
  };

  if (session) {
    return <Button href="/app">Go to app</Button>;
  }

  return <Button onClick={handleLogin}>Login</Button>;
}
