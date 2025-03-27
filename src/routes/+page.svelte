<script lang="ts">
  import Crafter from "$lib/components/Crafter.svelte";
  import { authToken } from "$lib/stores/auth";

  export let data;

  authToken.set(data.token);
</script>

<Crafter />
