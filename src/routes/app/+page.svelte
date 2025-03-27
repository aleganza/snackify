<script lang="ts">
  import { getUserProfile, getUserSavedTracks } from "$lib/api.js";
  import Avatar from "$lib/components/Avatar.svelte";
  import Crafter from "$lib/components/Crafter.svelte";
  import { authToken } from "$lib/stores/auth";
  import { userId } from "$lib/stores/userId";
  import { onMount } from "svelte";
  export let data;

  let user: any = null;
  authToken.set(data.token);

  onMount(async () => {
    user = await getUserProfile();
    userId.set(user.id);
  });
</script>

{#if user}
  <Avatar {user} />

  <Crafter />

  <!-- <LogoutButton /> -->
{/if}
