<script>
  import * as fb from "../../lib/firebase";

  let file;
  let images = [];
  function uploadFile() {
    fb.uploadPicture(file).then(() => {
      console.log("ALL DONE!");
      window.location.reload();
    });
  }

  fb.getAllFiles().then((files) => {
    images = files;
  });
</script>

<main class="p-4">
  <form action="" on:submit={uploadFile} class="flex input-group pb-2">
    <input type="file" bind:files={file} multiple class="file-input file-input-bordered file-input-primary" />
    <button class="btn btn-primary">Upload</button>
  </form>

  {#each images as image}
    <img src={image} class="m-2" />
  {/each}
</main>
