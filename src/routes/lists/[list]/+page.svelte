<script>
  import * as fb from "../../../lib/firebase";

  export let data;
  let { list, items } = data;
  let item;

  function addListItem() {
    fb.addListItem(list, item);
    items = [...items, { item: item, status: "new" }];
    item = "";
  }
</script>

<h2>{list}</h2>

{#each items as item}
  <li>{item.item}</li>
{/each}

<form on:submit|preventDefault={addListItem}>
  <input type="text" bind:value={item} />
  <button>Add</button>
</form>
