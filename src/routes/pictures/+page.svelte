<script>
  export let data;
</script>

{#each data.imgs as img}
  <img src={`./images/${img}`} alt={img} />
  <!-- <p>{img}</p> -->
{/each}

<form action="?/avatar" method="POST">
  <input type="file" name="avatar" />
  <button type="submit">upload</button>
</form>
