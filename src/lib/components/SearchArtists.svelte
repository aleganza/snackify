<script lang="ts">
  import { fetchArtists, type Artist } from "$lib/api";
  import Card from "./utils/Card.svelte";
  import Toast from "$lib/components/utils/Toast.svelte";
  import { showToast } from "$lib/hooks/useToast";
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

      showToast(`${artist.name} added!`, "success");
    }
  };

  const removeArtist = (artist: Artist) => {
    selectedArtists = selectedArtists.filter((a) => a.id !== artist.id);
    onArtistsSelected(selectedArtists);

    showToast(`${artist.name} removed!`, "success");
  };

  const clearSearchResults = () => {
    searchQuery = "";
    searchResults = [];
  };
</script>

<Toast />

<Card
  heading={"Choose your artists"}
  status={selectedArtists.length === 0 ? "incomplete" : "completed"}
>
  <div class="relative">
    <label class="input w-full">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
          ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"
          ></path></g
        ></svg
      >

      <input
        type="search"
        class="grow"
        placeholder="Search artist..."
        bind:value={searchQuery}
        on:input={handleSearchChange}
      />

      {#if searchResults.length > 0}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={clearSearchResults} class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-[1em] text-error"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      {/if}
    </label>
    {#if isSearching}
      <div
        class="absolute top-0 right-0 mt-3 mr-3 spinner-border text-gray-500"
      ></div>
    {/if}

    {#if searchResults.length > 0}
      <ul
        class="list bg-base-100 max-h-60 mt-3 overflow-y-auto rounded-box shadow-md"
      >
        {#each searchResults as artist}
          <li class="list-row px-0 py-2">
            <div class="flex justify-center items-center size-10">
              {#if artist.imageUrl}
                <img
                  class="size-10 rounded-box"
                  src={artist.imageUrl}
                  alt="artist avatar"
                />
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8 opacity-50"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              {/if}
            </div>
            <div class="flex items-center">
              <div>{artist.name}</div>
              <!-- <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> -->
            </div>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
              class="btn btn-circle btn-ghost"
              disabled={selectedArtists.some((a) => a.id === artist.id)}
              on:click={() => addArtist(artist)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={`size-[1.2em]${selectedArtists.some((a) => a.id === artist.id) ? " text-primary" : ""}`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={selectedArtists.some((a) => a.id === artist.id)
                    ? "m4.5 12.75 6 6 9-13.5"
                    : "M12 4.5v15m7.5-7.5h-15"}
                />
              </svg>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if selectedArtists.length > 0}
    <div class="mt-3 flex flex-wrap gap-2">
      {#each selectedArtists as artist}
        <div class="badge badge-soft h-8 flex justify-center">
          <span>{artist.name}</span>
          <button
            class="flex justify-center items-center w-4 h-4 rounded-full cursor-pointer text-gray-300 hover:text-gray-500 font-semibold"
            on:click={() => removeArtist(artist)}>X</button
          >
        </div>
      {/each}
    </div>
  {/if}
</Card>
