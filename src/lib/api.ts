import { get } from "svelte/store";
import { authToken } from "$lib/stores/auth";

export interface UserSavedTrack {
  id: string;
  name: string;
  artists: string[];
  imageUrl: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = get(authToken);

  if (!token) {
    throw new Error("Access token not available");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Request error (${url}):`, errorText);
    throw new Error("Request error");
  }

  return await res.json();
};

export const getUserProfile = async () => {
  return await fetchWithAuth("https://api.spotify.com/v1/me");
};

export const getUserSavedTracks = async (
  limitTotal?: number
): Promise<UserSavedTrack[]> => {
  let allTracks: UserSavedTrack[] = [];
  let limit = 50;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    if (limitTotal !== undefined && offset >= limitTotal) {
      break;
    }

    let fetchLimit =
      limitTotal !== undefined ? Math.min(limit, limitTotal - offset) : limit;
    const url = `https://api.spotify.com/v1/me/tracks?limit=${fetchLimit}&offset=${offset}`;
    const data = await fetchWithAuth(url);

    if (data.items && data.items.length > 0) {
      allTracks = allTracks.concat(
        data.items.map((i: any) => ({
          id: i.track.id,
          link: i.track.external_urls.spotify,
          name: i.track.name,
          artists: i.track.artists.map((a: any) => a.id),
          imageUrl: i.track.album.images.find((im: any) => im.width == 300).url,
        }))
      );
      offset += fetchLimit;
    } else {
      hasMore = false;
    }
  }

  return allTracks;
};

export const fetchArtists = async (query: string): Promise<Artist[]> => {
  if (!query) return [];

  const data = await fetchWithAuth(
    `https://api.spotify.com/v1/search?q=${query}&type=artist`
  );

  return data.artists.items.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.find((im: any) => im.width == 160)?.url,
  }));
};

export const createPlaylistWithTracks = async (
  playlistName: string,
  userId: string,
  matchedTracks: UserSavedTrack[]
): Promise<boolean> => {
  try {
    const urlCreatePlaylist = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistData = {
      name: playlistName,
      description: "A new snack created via Snackify",
      public: true,
    };

    const createdPlaylist = await fetchWithAuth(urlCreatePlaylist, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    });

    if (!createdPlaylist || !createdPlaylist.id) {
      console.error("Error creating playlist");
      return false;
    }

    const playlistId = createdPlaylist.id;
    console.log(`Playlist successfully created with id: ${playlistId}`);

    const trackUris = matchedTracks.map((track) => `spotify:track:${track.id}`);

    const urlAddTracks = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const addTracksData = {
      uris: trackUris,
    };

    const resAddTracks = await fetchWithAuth(urlAddTracks, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTracksData),
    });

    if (resAddTracks) {
      console.log(`Tracks added to playlist ${playlistId} successfully.`);
      return true;
    } else {
      console.error("Error adding tracks to playlist.");
      return false;
    }
  } catch (error) {
    console.error("Unusual error: ", error);
    return false;
  }
};
