<script lang="ts">
  import { toasts } from "$lib/hooks/useToast";
</script>

<div
  class="fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 z-100"
>
  {#each $toasts as toast (toast.id)}
    <div role="alert" class={`alert alert-${toast.type} alert-soft`}>
      <!-- Icona Dinamica -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        {#if toast.type === "info"}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        {:else if toast.type === "success"}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        {:else if toast.type === "warning" || toast.type === "error"}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        {/if}
      </svg>

      <!-- Messaggio -->
      <span>{toast.message}</span>
    </div>
  {/each}
</div>
