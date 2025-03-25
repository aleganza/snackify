<script>
  import { invoke } from "@tauri-apps/api/core";

  async function chiamaRust() {
    const message = "ale"
    const greeting = await invoke('greet', { name: message });

    console.log(greeting)
  }
</script>

<main class="p-8">
  <button class="btn btn-primary" on:click={chiamaRust}>Saluta</button>
</main>
