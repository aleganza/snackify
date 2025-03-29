<script lang="ts">
  import Card from "./utils/Card.svelte";

  export let onPlaylistInfoChanged: (
    name: string,
    isPrivate: boolean,
    includeAllArtists: boolean
  ) => void;

  let playlistName: string = "";
  let isPrivate: boolean = true;
  let includeAllArtists: boolean = false;

  const handleInputChange = (event: Event) => {
    playlistName = (event.target as HTMLInputElement).value;
    onPlaylistInfoChanged(playlistName, isPrivate, includeAllArtists);
  };

  const handlePrivateChange = () => {
    onPlaylistInfoChanged(playlistName, !isPrivate, includeAllArtists);
    isPrivate = !isPrivate;
  };

  const handleIncludeAllArtistsChange = () => {
    onPlaylistInfoChanged(playlistName, isPrivate, !includeAllArtists);
    includeAllArtists = !includeAllArtists;
  };
</script>

<Card
  heading="Enter info"
  status={playlistName === "" ? "incomplete" : "completed"}
>
  <label class="input w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-[1em] opacity-50"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
      />
    </svg>

    <input
      type="text"
      placeholder="Playlist name"
      class="grow"
      bind:value={playlistName}
      on:input={handleInputChange}
    />
  </label>

  <div class="mt-3 flex flex-col gap-2">
    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isPrivate}
        class="checkbox checkbox-sm checked:bg-success checked:text-white checked:border-success"
        id="make-private-checkbox"
        on:change={handlePrivateChange}
      />
      <label for="make-private-checkbox" class="text-sm opacity-50"
        >Make private</label
      >
    </div>

    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={includeAllArtists}
        class="checkbox checkbox-sm checked:bg-success checked:text-white checked:border-success"
        id="include-all-artists-checkbox"
        on:change={handleIncludeAllArtistsChange}
      />
      <label for="include-all-artists-checkbox" class="text-sm opacity-50">
        Include only songs featuring all the selected artists
      </label>
    </div>
  </div>
</Card>
