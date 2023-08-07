<script>
  import { currentUser } from "$lib/firebase";
</script>

{#if $currentUser}
  <slot />
{/if}
