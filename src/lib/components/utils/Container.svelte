<script lang="ts">
  export let className = "";
</script>

<h1 class="absolute top-6 left-6 text-3xl font-bold">Craftify</h1>

<div class="flex items-center justify-center min-h-screen bg-base-200">
  <div
    class={`relative w-[1024px] h-[608px] bg-base-100 shadow-lg rounded-lg p-6 ${className}`}
  >
    <slot />

    <!-- <Dock /> -->
  </div>
</div>
