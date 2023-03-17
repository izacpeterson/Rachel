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

<form action="" on:submit={uploadFile} class="flex">
  <input
    type="file"
    bind:files={file}
    multiple
    class="file-input file-input-bordered file-input-primary"
  />
  <button class="btn btn-primary">Upload</button>
</form>

{#each images as image}
  <img src={image} />
{/each}
