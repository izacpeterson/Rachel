<script>
  export let data;
  console.log(data);
</script>

<ul class="p-4">
  {#each data.items as item}
    <li>
      <p>{item.txt}</p>
    </li>
  {/each}
</ul>

<form method="POST" action="?/newListItem">
  <p>New List Item</p>
  <label for="name">Name</label>
  <input type="text" name="item" />
  <input type="text" name="uuid" bind:value={data.list} hidden />
  <button>Submit</button>
</form>
