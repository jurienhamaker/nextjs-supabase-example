"use client";

import { useEffect, useState } from "react";
import useSession from "../supabase/use-session";

export default function usePlayer() {
  const session = useSession();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [ready, setReady] = useState(false);
  const [track, setTrack] = useState<any | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(false);
  const [deviceID, setDeviceID] = useState<string | null>(null);

  useEffect(() => {
    console.log(session);
    if (!session) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "BOBB",
        getOAuthToken: (cb: any) => {
          cb(session.provider_token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setReady(true);
        setDeviceID(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state: any) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [session]);

  const play = () => {
    if (!player) {
      return;
    }

    if (!ready) {
      return;
    }
  };

  return { player, ready, track, active, paused, play, deviceID };
}
