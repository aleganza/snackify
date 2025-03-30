<script>
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
  <img src="/logo.png" alt="logo" class="w-[70px] h-[70px] filter drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] mb-3" />

  <h1 class="text-3xl font-bold mb-2">Snackify</h1>

  <p class="text-sm opacity-50 mb-5 max-w-[350px] text-center">
    Create personalized playlists by selecting tracks from your saved music,
    filtered by your favorite artists, and organize them into a "Snack"
    playlist.
  </p>

  <div class="min-w-[250px] max-w-[250px]">
    <slot />
  </div>
</div>
