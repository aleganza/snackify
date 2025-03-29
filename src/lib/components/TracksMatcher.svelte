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

<div class="flex items-center gap-1 mb-5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class={`h-[1em] ${matchedTracks.length > 0 ? "text-primary" : "text-error"}`}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d={matchedTracks.length > 0
        ? "m4.5 12.75 6 6 9-13.5"
        : "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}
    />
  </svg>

  <p
    class={`text-sm ${matchedTracks.length > 0 ? "text-primary" : "text-error"}`}
  >
  {matchedTracks.length} matches found
  </p>
</div>
