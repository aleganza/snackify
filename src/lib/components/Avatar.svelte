<script>
  export let user;
</script>

<div
  class="avatar absolute right-6 top-6 flex justify-center items-center flex- gap-3"
>
  <h3 class="font-bold">
    Logged in as <span class="text-primary">{user.display_name}</span>
  </h3>
  <div class="rounded-full w-12">
    <img src={user.images[0]?.url} alt="avatar" />
  </div>
</div>
