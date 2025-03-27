<script lang="ts">
  import { onMount } from "svelte";
  import StatusHeading from "./utils/StatusHeading.svelte";
  import { getUserSavedTracks } from "$lib/api";

  export let onTracksLoaded: (tracks: UserSavedTrack[]) => void;

  let tracks: UserSavedTrack[] = [];
  let status: "not_loaded" | "loading" | "loaded" = "not_loaded";
  let lastLoaded: string | null = null;
  let trackCount: number = 0;

  interface UserSavedTrack {
    id: string;
    name: string;
    artists: any[];
    imageUrl: string;
  }

  const loadTracksFromLocalStorage = () => {
    const savedData = localStorage.getItem("tracks");
    const savedDate = localStorage.getItem("lastLoaded");

    if (savedData && savedDate) {
      tracks = JSON.parse(savedData);
      lastLoaded = savedDate;
      trackCount = tracks.length;
      status = "loaded";
      onTracksLoaded(tracks);
    }
  };

  const saveTracksToLocalStorage = (tracks: UserSavedTrack[]) => {
    localStorage.setItem("tracks", JSON.stringify(tracks));
    localStorage.setItem("lastLoaded", new Date().toISOString());
  };

  const loadTracks = async () => {
    status = "loading";
    try {
      const fetchedTracks: UserSavedTrack[] = await getUserSavedTracks();
      tracks = fetchedTracks;
      trackCount = tracks.length;

      saveTracksToLocalStorage(tracks);

      status = "loaded";
      onTracksLoaded(tracks);
    } catch (error) {
      status = "not_loaded";
      console.error("Error loading tracks from storage:", error);
    }
  };

  onMount(() => {
    loadTracksFromLocalStorage();
  });
</script>

<div>
  <StatusHeading
    text={"Load your saved tracks"}
    status={tracks.length === 0 ? "incomplete" : "completed"}
  />

  <button
    class="btn btn-primary"
    on:click={loadTracks}
    disabled={status === "loading"}
  >
    Load Tracks
  </button>

  <div class="mt-4">
    {#if status === "loading"}
      <p>Loading...</p>
    {:else if status === "loaded"}
      <p>Tracks Loaded</p>
      <p>Last Loaded: {lastLoaded}</p>
      <p>Number of Tracks: {trackCount}</p>
    {:else}
      <p>No tracks loaded</p>
    {/if}
  </div>
</div>
