<script lang="ts">
  import { onMount } from 'svelte';
  import { getUserProfile } from '$lib/api';

  let user: any = null;

  onMount(async () => {
      user = await getUserProfile();
  });
</script>

{#if user}
  <h1>Ciao, {user.display_name}!</h1>
  <img src={user.images[0]?.url} alt="Avatar" width="100" />
{/if}
