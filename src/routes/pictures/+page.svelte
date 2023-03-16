<script>
  export let data;
</script>

{#each data.imgs as img}
  <img src={`./build/client/images/${img}`} />
  <!-- <p>{img}</p> -->
{/each}

<form method="POST" action="?/avatar" enctype="multipart/form-data">
  <input type="file" name="avatar" />
  <button type="submit">upload</button>
</form>
