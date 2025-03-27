<script lang="ts">
  export let heading: string;
  export let status: "completed" | "incomplete";
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  tabindex="0"
  class="collapse collapse-arrow bg-base-100 border-base-300 border mb-3"
>
  <div class="flex flex-row items-center gap-2 collapse-title font-semibold">
    <div
      aria-label={status === "completed" ? "success" : "warning"}
      class={`status ${status === "completed" ? "status-success" : "status-warning"}`}
    ></div>
    {heading}
  </div>

  <input type="checkbox" />

  <div class="collapse-content text-sm">
    <slot />
  </div>
</div>
