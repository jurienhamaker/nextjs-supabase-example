"use client";

import useSpotify from "@/lib/spotify/use-spotify";
import { Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Search = () => {
  const spotify = useSpotify();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);

  const doSearch = async () => {
    if (!spotify) {
      return;
    }

    if (query === "") {
      setResults([]);
      return;
    }

    const data = await spotify.search(query, ["track"]);
    setResults(data.tracks.items);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      doSearch();
    }, 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query, 300]);

  return (
    <div className="w-full flex flex-col gap-4 max-w-128">
      <input
        className="w-full border border-foreground rounded h-8 px-4"
        type="text"
        onChange={(ev) => setQuery(ev.target.value)}
      />

      {!!results.length && (
        <div className="flex flex-col gap-2 h-[50dvh] overflow-y-auto">
          {results.map((track) => {
            const image = track.album.images.at(0);
            return (
              <div className="flex gap-2 items-center" key={track.id}>
                {image && (
                  <Image
                    className="h-24 w-24 rounded object-cover"
                    src={image!.url}
                    width={image.width}
                    height={image.height}
                    alt={track.name}
                  />
                )}
                <div className="flex flex-col gap-1">
                  <p>{track.name}</p>
                  <p>{track.artists.at(0)!.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
