<script>
  let nomePlaylist = '';
</script>

<main class="p-8">
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="https://via.placeholder.com/400x200" alt="Immagine Playlist" /></figure>
    <div class="card-body">
      <h2 class="card-title">Crea una nuova Playlist</h2>
      <p>Seleziona le canzoni preferite e crea una nuova playlist personalizzata.</p>

      <input 
        type="text" 
        placeholder="Nome Playlist" 
        class="input input-bordered w-full" 
        bind:value={nomePlaylist} 
      />

      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={() => alert(`Playlist ${nomePlaylist} creata!`)}>Crea Playlist</button>
      </div>
    </div>
  </div>

</main>
