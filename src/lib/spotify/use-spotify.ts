"use client";

import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { client } from "./client";

export default function useSpotify() {
  const [spotify, setSpotify] = useState<SpotifyApi | null>(null);

  useEffect(() => {
    setSpotify(client);
  }, []);

  return spotify;
}
