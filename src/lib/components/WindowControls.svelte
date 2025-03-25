<script>
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { Minus, X } from "@lucide/svelte";

  const appWindow = getCurrentWindow();

  const minimizeWindow = () => {
    appWindow.minimize();
  };

  const closeWindow = () => {
    appWindow.close();
  };
</script>

<div class="relative">
  <div class="absolute top-4 right-4 flex space-x-2">
    <button
      onclick={minimizeWindow}
      class="btn btn-circle btn-neutral btn-sm"
    >
      <Minus class="w-4 h-4" />
    </button>
    
    <button
      onclick={closeWindow}
      class="btn btn-circle btn-neutral btn-sm"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</div>

