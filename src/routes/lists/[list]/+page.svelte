<script>
  import * as fb from "../../../lib/firebase";

  export let data;
  let { list, items } = data;
  let item;
  console.log(items);

  function addListItem() {
    fb.addListItem(list, item);
    items = [...items, { item: item, status: "new" }];
    item = "";
  }
</script>

<h2 class="capitalize text-center">{list}</h2>

<ul>
  {#each items as item}
    <li class="m-2">
      {item.item}
      <button
        on:click={fb.updateItemStatus(list, item).then((status) => {
          item.status = status;
        })}
        class="btn btn-primary">{item.status}</button
      >
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={addListItem} class="p-4 flex flex-col">
  <span>Add new</span>
  <input
    type="text"
    bind:value={item}
    placeholder={items[0].item}
    class="input input-bordered input-primary"
  />
  <button class="btn btn-primary">Add</button>
</form>
