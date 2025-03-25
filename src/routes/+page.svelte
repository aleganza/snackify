<script>
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-read-private'
  ];

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      show_dialog: 'true'
  })}`;

  function login() {
      window.location.href = authUrl;
  }
</script>

<main class="flex flex-col items-center justify-center h-screen space-y-6">
  <h1 class="text-3xl font-bold">Welcome to Ticklify</h1>
  <p class="w-3/4 text-center">Create quick and personalized playlists with your favorite Spotify tracks.</p>
  <button on:click={login} class="btn btn-primary">Connect with Spotify</button>
</main>
