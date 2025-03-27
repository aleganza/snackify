<script lang="ts">
  export let text: string;
  export let status: "completed" | "incomplete";
</script>

<div class="flex flex-row items-center gap-3 mb-3">
  <h1 class="text-xl font-bold">
    {text}
  </h1>

  <div
    aria-label={status === "completed" ? "success" : "warning"}
    class={`status ${status === "completed" ? "status-success" : "status-warning"}`}
  ></div>
</div>
