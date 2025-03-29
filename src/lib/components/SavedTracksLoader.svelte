<script lang="ts">
  import { onMount } from "svelte";
  import { getUserSavedTracks } from "$lib/api";
  import Card from "./utils/Card.svelte";
  import Toast from "./utils/Toast.svelte";
  import { showToast } from "$lib/hooks/useToast";

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

      showToast("Loaded saved tracks from browser storage.", "success");
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

      lastLoaded = "now";
      status = "loaded";
      onTracksLoaded(tracks);

      showToast(`${tracks.length} tracks successfully loaded from Spotify.`, "success");
    } catch (error) {
      status = "not_loaded";
      console.error("Error loading tracks from Spotify:", error);
      showToast("An error occurred while loading the tracks.", "error");
    }
  };

  const formatTimeAgo = (date: string) => {
    if (date === "now") return date;

    const now = new Date();
    const loadedDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - loadedDate.getTime()) / 1000
    );

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }
  };

  onMount(() => {
    loadTracksFromLocalStorage();
  });
</script>

<Toast />

<Card
  heading={"Load your saved tracks"}
  status={tracks.length === 0 ? "incomplete" : "completed"}
>
  <button
    class="btn btn-primary"
    on:click={loadTracks}
    disabled={status === "loading"}
  >
    Load Tracks
  </button>

  <div class="mt-4">
    {#if status === "loading"}
      <span class="loading loading-spinner text-primary"></span>
    {:else if status === "loaded"}
      <p class="text-sm text-primary">{trackCount} Tracks loaded</p>
      <p class="text-sm opacity-50">
        Last loaded {lastLoaded ? formatTimeAgo(lastLoaded) : "Never"}
      </p>
    {:else}
      <p class="text-sm text-error">No tracks loaded</p>
    {/if}
  </div>
</Card>
