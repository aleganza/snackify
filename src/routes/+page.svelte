<script lang="ts">
  import Forger from "$lib/components/Forger.svelte";
  import Toast from "$lib/components/utils/Toast.svelte";
  import { showToast } from "$lib/hooks/useToast.js";
  import { authToken } from "$lib/stores/auth";

  export let data;

  authToken.set(data.token);

  if (data.token) {
    showToast("Logged in with Spotify!", "success");
  }
</script>

<Toast />

<Forger />
