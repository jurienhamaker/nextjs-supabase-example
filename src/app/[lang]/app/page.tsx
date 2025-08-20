"use client";

import LogoutButton from "@/components/logout-button";
import { Search } from "@/components/search";
import useSession from "@/lib/supabase/use-session";
import { useCallback } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

export default function App() {
  const session = useSession();

  const getPlayerToken = useCallback(
    (cb: any) => {
      if (!session) {
        return;
      }

      cb(session.provider_token);
    },
    [session]
  );

  return (
    <div className="min-h-dvh w-dvw flex flex-col gap-4 items-center justify-center">
      <WebPlaybackSDK
        initialDeviceName="My awesome Spotify app"
        getOAuthToken={getPlayerToken}
        initialVolume={0.5}
      >
        <Search />
      </WebPlaybackSDK>

      <LogoutButton />
    </div>
  );
}
