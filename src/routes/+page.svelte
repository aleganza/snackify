<script lang="ts">
  import Forger from "$lib/components/Forger.svelte";
  import { authToken } from "$lib/stores/auth";

  export let data;

  authToken.set(data.token);
</script>

<Forger />
