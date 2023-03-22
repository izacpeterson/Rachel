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
    <li class="mx-24 my-4 flex justify-between items-center">
      <p>{item.item}</p>
      <button
        on:click={fb.updateItemStatus(list, item).then((status) => {
          item.status = status;
        })}
        class={item.status == "done"
          ? "bg-white text-primary border border-primary rounded p-2 transition-all duration-200"
          : "bg-primary text-white p-2 transition-all border border-primary duration-200 shadow-lg rounded"}
      >
        <span class="material-symbols-outlined flex items-center justify-center"
          >{item.status == "done" ? "restart_alt" : "check"}</span
        ></button
      >
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={addListItem} class="p-4 flex flex-col">
  <span>Add new</span>
  <input type="text" bind:value={item} class="bg-gray-200 p-2" />
  <button class="bg-primary p-2">Add</button>
</form>
