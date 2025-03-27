<script lang="ts">
  import Container from "$lib/components/utils/Container.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<Container>
  {@render children()}
</Container>
