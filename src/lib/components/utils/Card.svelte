<script lang="ts">
  export let heading: string;
  export let status: "completed" | "incomplete";
  export let checked: boolean = false;
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="collapse collapse-arrow bg-base-100 border-base-300 border mb-3">
  <div class="flex flex-row items-center gap-2 collapse-title font-semibold">
    <div
      aria-label={status === "completed" ? "success" : "error"}
      class={`status ${status === "completed" ? "status-success" : "status-error"}`}
    ></div>
    {heading}
  </div>

  <input type="radio" name="accordion" checked={checked ?? undefined} />

  <div class="collapse-content text-sm">
    <slot />
  </div>
</div>
