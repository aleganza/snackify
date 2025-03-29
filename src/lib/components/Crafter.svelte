<script lang="ts">
  import {
    addTracksToPlaylist,
    createPlaylist,
    getUserId,
    type Artist,
    type UserSavedTrack,
  } from "$lib/api";
  import { get } from "svelte/store";
  import EnterPlaylistInfo from "./EnterPlaylistInfo.svelte";
  import SavedTracksLoader from "./SavedTracksLoader.svelte";
  import SearchArtists from "./SearchArtists.svelte";
  import TracksMatcher from "./TracksMatcher.svelte";
  import Authenticator from "./Authenticator.svelte";
  import Toast from "./utils/Toast.svelte";
  import { showToast } from "$lib/hooks/useToast";

  let selectedArtists: Artist[] = [];
  let savedTracks: UserSavedTrack[] = [];
  let matchedTracks: UserSavedTrack[] = [];
  let playlistName: string = "";

  let isLoading: boolean = false;
  let buttonText: string = "Forge your Snack!";

  $: canForge =
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

  const forgeSnack = async () => {
    isLoading = true;
    buttonText = "Forging snack...";

    const userId = await getUserId();

    if (!userId) {
      showToast("Error fetching user data.", "error");
      isLoading = false;
      buttonText = "Forge your Snack!";
      return;
    }

    const playlistId = await createPlaylist(playlistName, userId);

    if (!playlistId) {
      showToast("Error creating the playlist.", "error");
      isLoading = false;
      buttonText = "Forge your Snack!";
      return;
    }

    showToast("Playlist successfully created!", "success");
    buttonText = "Adding tracks...";

    const tracksAdded = await addTracksToPlaylist(playlistId, matchedTracks);

    if (tracksAdded) {
      showToast("Tracks successfully added to the playlist!", "success");
    } else {
      showToast("Error adding tracks to the playlist.", "error");
    }

    isLoading = false;
    buttonText = "Forge your Snack!";
  };
</script>

<Toast />

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
      onclick={forgeSnack}
      disabled={!canForge || isLoading}
    >
      {buttonText}
    </button>
  </div>
</div>
