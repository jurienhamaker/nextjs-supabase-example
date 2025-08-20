"use client";

import {
  AccessToken,
  IAuthStrategy,
  SdkConfiguration,
  SdkOptions,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk"; // use "@spotify/web-api-ts-sdk" in your own project
import { createSupabaseBrowserClient } from "../supabase/browser-client";

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 */
class SupabaseAuthStrategy implements IAuthStrategy {
  public getOrCreateAccessToken(): Promise<AccessToken> {
    return this.getAccessToken();
  }

  public async getAccessToken(): Promise<AccessToken> {
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase.auth.getSession();

    if (!data?.session) {
      return {} as AccessToken;
    }

    return {
      access_token: data.session.provider_token,
      token_type: "Bearer",
      expires_in: data.session.expires_in,
      expires: data.session.expires_at,
      refresh_token: data.session.provider_refresh_token,
    } as AccessToken;
  }

  public removeAccessToken(): void {
    console.warn("[Spotify-SDK][WARN]\nremoveAccessToken not implemented");
  }

  public setConfiguration(_: SdkConfiguration): void {
    console.warn("[Spotify-SDK][WARN]\nsetConfiguration not implemented");
  }
}

function spotifyWithSupabaseAuthStrategy(config?: SdkOptions) {
  const strategy = new SupabaseAuthStrategy();
  return new SpotifyApi(strategy, config);
}

export const client = spotifyWithSupabaseAuthStrategy();
