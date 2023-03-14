<script>
  export let data;
</script>

{#each data.imgs as img}
  <img src={"./images/" + img} />
  <p>{img}</p>
{/each}

<form action="?/avatar" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" placeholder="avatar" />
  <button type="submit">upload</button>
</form>
