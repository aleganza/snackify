<script lang="ts">
  import WindowControls from '$lib/components/WindowControls.svelte';
	import '../app.css';
	
	let { children } = $props();
</script>

<WindowControls />

{@render children()}
