<script>
  import { authToken } from "$lib/stores/auth";
  import { get } from "svelte/store";
  import Card from "./utils/Card.svelte";

  const token = get(authToken);

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "user-library-read",
    "playlist-modify-private",
    "playlist-modify-public",
  ];

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
    {
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes.join(" "),
      show_dialog: "true",
    }
  )}`;

  const login = () => {
    window.location.href = authUrl;
  };

  const logout = () => {
    window.location.href = "/logout";
  };
</script>

<Card heading="Connect Spotify" status={token ? "completed" : "incomplete"}>
  {#if token}
    <button on:click={logout} class="btn btn-warning">Logout</button>
  {:else}
    <button on:click={login} class="btn btn-primary">Login</button>
  {/if}
</Card>
