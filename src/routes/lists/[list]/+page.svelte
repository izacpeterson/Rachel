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

<main>
  <h2 class="capitalize text-center text-4xl">{list}</h2>

  <form on:submit|preventDefault={addListItem} class="p-4 flex flex-col">
    <span>Add new</span>
    <div class="flex w-full justify-between">
      <input type="text" bind:value={item} class="p-2 border rounded w-full" placeholder="New List Item" />
      <button class="bg-primary text-white p-2 rounded w-20">Add</button>
    </div>
  </form>

  <ul>
    {#each items as item}
      <li class="mx-24 my-1 flex justify-between items-center">
        <p>{item.item}</p>
        <button
          on:click={fb.updateItemStatus(list, item).then((status) => {
            item.status = status;
          })}
          class={item.status == "done" ? " text-red-500 border border-[rgba(255,255,255,0)] rounded p-2 transition-all duration-200" : "bg-primary text-white p-2 transition-all border border- duration-200 shadow-lg rounded"}
        >
          <span class="material-symbols-outlined flex items-center justify-center">{item.status == "done" ? "restart_alt" : "check"}</span></button
        >
      </li>
    {/each}
  </ul>
</main>
