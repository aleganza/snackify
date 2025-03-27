<script lang="ts">
  import type { UserSavedTrack } from "$lib/api";
  import type { Artist } from "$lib/api";

  export let artists: Artist[];
  export let tracks: UserSavedTrack[];
  export let onMatchedTracksUpdated: (matchedTracks: UserSavedTrack[]) => void; // Callback prop

  let matchedTracks: UserSavedTrack[] = [];

  const matchTracksWithArtists = (
    tracks: UserSavedTrack[],
    artists: Artist[]
  ): UserSavedTrack[] => {
    return tracks.filter((track) =>
      track.artists.some((artistId) =>
        artists.some((artist) => artist.id === artistId)
      )
    );
  };

  $: matchedTracks = matchTracksWithArtists(tracks, artists);

  $: {
    onMatchedTracksUpdated(matchedTracks);
  }
</script>

<div>
  <p>Found {matchedTracks.length} matches</p>
</div>
