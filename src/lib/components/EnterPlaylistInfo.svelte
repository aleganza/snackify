<script lang="ts">
  export let onPlaylistNameChanged: (name: string) => void;

  let playlistName: string = "";

  const handleInputChange = (event: Event) => {
    playlistName = (event.target as HTMLInputElement).value;
    onPlaylistNameChanged(playlistName);
  };
</script>

<div>
  <input
    type="text"
    placeholder="Playlist name"
    class="input input-sm"
    bind:value={playlistName}
    on:input={handleInputChange}
  />

  <!-- <label class="fieldset-label">
    <input type="checkbox" checked={true} class="checkbox checkbox-primary" />
    
  </label> -->
</div>
