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

export const getUserId = async (): Promise<string | null> => {
  const token = get(authToken);

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error fetching user data");
      return null;
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

export const createPlaylist = async (
  playlistName: string,
  userId: string
): Promise<string | null> => {
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
      return null;
    }

    console.log(`Playlist successfully created with id: ${createdPlaylist.id}`);
    return createdPlaylist.id;
  } catch (error) {
    console.error("Unusual error while creating playlist: ", error);
    return null;
  }
};

export const addTracksToPlaylist = async (
  playlistId: string,
  matchedTracks: UserSavedTrack[]
): Promise<boolean> => {
  try {
    const chunkArray = (array: UserSavedTrack[], size: number) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    const trackChunks = chunkArray(matchedTracks, 100);

    for (let i = 0; i < trackChunks.length; i++) {
      const trackUris = trackChunks[i].map(
        (track) => `spotify:track:${track.id}`
      );

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

      if (!resAddTracks) {
        console.error(`Error adding tracks to playlist on batch ${i + 1}`);
        return false;
      }

      console.log(
        `Batch ${i + 1} of tracks added to playlist ${playlistId} successfully.`
      );
    }

    return true;
  } catch (error) {
    console.error("Unusual error while adding tracks: ", error);
    return false;
  }
};
