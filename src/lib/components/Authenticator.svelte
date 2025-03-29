<script>
  import { authToken } from "$lib/stores/auth";
  import { get } from "svelte/store";
  import Card from "./utils/Card.svelte";
  import Toast from "$lib/components/utils/Toast.svelte";
  import { showToast } from "$lib/hooks/useToast";

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
    showToast("Logged out!", "success")
  };
</script>

<Toast />

<Card
  heading="Connect Spotify"
  status={token ? "completed" : "incomplete"}
  checked
>
  {#if token}
    <button onclick={logout} class="btn btn-error">Logout</button>
  {:else}
    <button onclick={login} class="btn btn-primary">Login</button>
  {/if}
</Card>
