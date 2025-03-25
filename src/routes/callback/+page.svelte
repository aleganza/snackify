<script>
  import { onMount } from "svelte";
  import { accessToken } from "$lib/stores/auth";

  onMount(async () => {
    console.log("0");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("1");
    console.log(code);

    if (code) {
      try {
        const res = await fetch(`/callback?code=${code}`);
        console.log(res);
        const data = await res.json();
        console.log(data);

        accessToken.set(data.access_token);

        window.location.href = "/";
      } catch (error) {
        console.error(error);
      }
    }
  });
</script>

<p>Autenticazione in corso...</p>
