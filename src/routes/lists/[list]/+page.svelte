<script>
  import * as fb from "../../../lib/firebase";

  export let data;
  let { list, items } = data;
  let item;
  console.log(items)

  function addListItem() {
    fb.addListItem(list, item);
    items = [...items, { item: item, status: "new" }];
    item = "";
  }

 
</script>

<h2 class='capitalize text-center'>{list}</h2>

<ul>
  {#each items as item}
    <li class='m-2'>{item.item} <button on:click={fb.updateItemStatus(list, item).then((status)=>{item.status=status})} class='bg-primary'>{item.status}</button></li>
  {/each}
</ul>


<form on:submit|preventDefault={addListItem} class='p-4 flex flex-col'>
    <span>Add new</span>
  <input type="text" bind:value={item} class='bg-gray-200' />
  <button class='bg-primary'>Add</button>
</form>
