<script>
  export let data;
</script>

<ul class="p-4">
  {#each data.lists as list}
    <li>
      <a href="/list/{list.uuid}">{list.name}</a>
    </li>
  {/each}
</ul>

<form method="POST" action="?/newList">
  <h3>New List</h3>
  <label for="name">Name</label>
  <input type="text" name="name" />
  <button>Submit</button>
</form>
