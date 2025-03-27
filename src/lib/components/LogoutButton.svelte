<script lang="ts">
  function logout() {
      window.location.href = '/logout';
  }
</script>

<button on:click={logout}>Logout</button>
