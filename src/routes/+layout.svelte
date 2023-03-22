<script>
  import "../app.css";

  let options = ["corporate", "business"];
  let selected = 0;
</script>

<div data-theme={options[selected]} class="h-screen">
  <!-- <input type="number" bind:value={selected} /> -->
  <header>
    <nav class="flex justify-between px-4 py-2">
      <a href="/">Home</a>
      <a href="/lists">Lists</a>
      <a href="/pictures">Pictures</a>
    </nav>
  </header>

  <slot />
</div>
