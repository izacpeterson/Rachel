<script>
  import "../app.css";

  let options = ["corporate", "business"];
  let selected = 0;

  import { currentUser } from "$lib/firebase";
  import AuthChecker from "../components/AuthChecker.svelte";
</script>

<div data-theme={options[selected]} class="h-screen flex flex-col justify-between">
  <!-- <input type="number" bind:value={selected} /> -->

  <slot />

  <AuthChecker>
    <header class="shadow-md fixed bottom-0 shadow-[] w-full">
      <nav class="flex justify-between items-center px-4 py-2 bg-primary text-white">
        <a href="/"><span class="material-symbols-outlined"> home </span></a>
        <a href="/lists"><span class="material-symbols-outlined"> list </span></a>
        <a href="/pictures"><span class="material-symbols-outlined"> photo_camera </span></a>
      </nav>
    </header>
  </AuthChecker>
</div>

<a href="/lists" class="fixed bottom-0 left-0 w-24 h-24"></a>

<style>
  header {
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.25);
  }
</style>
