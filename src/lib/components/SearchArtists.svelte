<script lang="ts">
  import { fetchArtists, type Artist } from "$lib/api";
  import StatusHeading from "./utils/StatusHeading.svelte";

  export let onArtistsSelected: (artists: Artist[]) => void;

  let searchQuery = "";
  let searchResults: Artist[] = [];
  let selectedArtists: Artist[] = [];
  let isSearching = false;

  let debounceTimeout: ReturnType<typeof setTimeout>;

  const handleSearchChange = async (event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    searchQuery = query;

    clearTimeout(debounceTimeout);

    if (query.length >= 3) {
      isSearching = true;

      debounceTimeout = setTimeout(async () => {
        searchResults = await fetchArtists(query);
        isSearching = false;
      }, 300);
    } else {
      searchResults = [];
    }
  };

  const addArtist = (artist: Artist) => {
    if (!selectedArtists.some((a) => a.id === artist.id)) {
      selectedArtists = [...selectedArtists, artist];
      onArtistsSelected(selectedArtists);
    }
  };

  const removeArtist = (artistId: string) => {
    selectedArtists = selectedArtists.filter(
      (artist) => artist.id !== artistId
    );
    onArtistsSelected(selectedArtists);
  };

  const handleKeydown = (event: KeyboardEvent, artist: any) => {
    if (event.key === "Enter" || event.key === " ") {
      addArtist(artist);
    }
  };
</script>

<div class="w-full max-w-xl mt-6">
  <StatusHeading
    text={"Choose your artists"}
    status={selectedArtists.length === 0 ? "incomplete" : "completed"}
  />

  <div class="relative">
    <input
      type="text"
      class="input input-bordered w-full pr-16"
      placeholder="Search artist..."
      bind:value={searchQuery}
      on:input={handleSearchChange}
    />
    {#if isSearching}
      <div
        class="absolute top-0 right-0 mt-3 mr-3 spinner-border text-gray-500"
      ></div>
    {/if}

    {#if searchResults.length > 0}
      <ul
        class="absolute w-full rounded-[20px_20px_20px_20px] shadow-lg mt-2 max-h-60 overflow-y-auto z-10"
      >
        {#each searchResults as artist}
          <li class="cursor-pointer bg-base-300 hover:brightness-[1.10]">
            <button
              class="flex flex-row items-center gap-3 p-2 w-full text-left focus:outline-none bg-red cursor-pointer"
              on:click={() => addArtist(artist)}
              on:keydown={(event) => handleKeydown(event, artist)}
              aria-label={`Select ${artist.name}`}
            >
              {#if artist.imageUrl}<img
                  src={artist.imageUrl}
                  alt="avatar"
                  class="w-[30px] rounder-full"
                />{/if}
              {artist.name}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if selectedArtists.length > 0 || true}
    <div class="mt-4 flex flex-wrap space-x-2">
      {#each selectedArtists as artist}
        <div class="badge badge-soft h-8 bg-red-50 flex justify-center">
          <span>{artist.name}</span>
          <button
            class="flex justify-center items-center w-4 h-4 rounded-full cursor-pointer text-gray-300 hover:text-gray-500 font-semibold"
            on:click={() => removeArtist(artist.id)}>X</button
          >
        </div>
      {/each}
    </div>
  {/if}
</div>
