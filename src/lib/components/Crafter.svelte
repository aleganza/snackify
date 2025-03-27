<script lang="ts">
  import {
    createPlaylistWithTracks,
    type Artist,
    type UserSavedTrack,
  } from "$lib/api";
  import { get } from "svelte/store";
  import EnterPlaylistInfo from "./EnterPlaylistInfo.svelte";
  import SavedTracksLoader from "./SavedTracksLoader.svelte";
  import SearchArtists from "./SearchArtists.svelte";
  import TracksMatcher from "./TracksMatcher.svelte";
  import { userId } from "$lib/stores/userId";
  import Authenticator from "./Authenticator.svelte";

  const id = get(userId);

  let selectedArtists: Artist[] = [];
  let savedTracks: UserSavedTrack[] = [];
  let matchedTracks: UserSavedTrack[] = [];
  let playlistName: string = "";

  $: canCraft =
    selectedArtists.length !== 0 &&
    savedTracks.length !== 0 &&
    matchedTracks.length !== 0 &&
    playlistName !== "";

  const handleArtistsSelected = (artists: Artist[]) => {
    selectedArtists = artists;
  };

  const handleTracksLoaded = (tracks: UserSavedTrack[]) => {
    savedTracks = tracks;
  };

  const handleMatchedTracksUpdated = (
    updatedMatchedTracks: UserSavedTrack[]
  ) => {
    matchedTracks = updatedMatchedTracks;
  };

  const handlePlaylistNameChanged = (name: string) => {
    playlistName = name;
  };

  const craftPlaylist = async () => {
    if (!id) return;

    const created = await createPlaylistWithTracks(
      playlistName,
      id,
      matchedTracks
    );

    created
      ? alert("Playlist created!")
      : alert("A problem occured creating Snack");
  };
</script>

<div>
  <Authenticator />

  <SearchArtists onArtistsSelected={handleArtistsSelected} />

  <SavedTracksLoader onTracksLoaded={handleTracksLoaded} />

  <EnterPlaylistInfo onPlaylistNameChanged={handlePlaylistNameChanged} />

  <TracksMatcher
    artists={selectedArtists}
    tracks={savedTracks}
    onMatchedTracksUpdated={handleMatchedTracksUpdated}
  />

  <div class="w-full flex justify-center">
    <button
      class="btn btn-primary"
      onclick={craftPlaylist}
      disabled={!canCraft}
    >
      Forge your Snack!
    </button>
  </div>
</div>
