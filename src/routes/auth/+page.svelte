<script>
  import * as fb from "$lib/firebase";
  let email;
  let password;

  import AuthChecker from "../../components/AuthChecker.svelte";
</script>

<main>
  <form
    on:submit|preventDefault={() =>
      fb
        .login(email, password)
        .then((user) => (window.location.href = "/"))
        .catch((error) => alert(error))}
    class="flex flex-col"
  >
    <input bind:value={email} type="text" class=" p-2 m-2 bg-slate-200" />
    <input bind:value={password} type="password" class=" p-2 m-2 bg-slate-200 border" />
    <button type="submit" class="p-2 m-2 bg-primary text-white">Login</button>

    <AuthChecker>
      <button on:click={() => fb.logout().then((window.location.href = "/"))} class="p-2 m-2 bg-red-500 text-white">Sign out</button>
    </AuthChecker>
  </form>
</main>
