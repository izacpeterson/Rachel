<script>
  import * as fb from "../lib/firebase";
  import TimeTogether from "../components/TimeTogether.svelte";
  import TimeMarried from "../components/TimeMarried.svelte";
  import Countdown from "../components/Countdown.svelte";
</script>

<main class="flex flex-col items-center justify-center h-full">
  <h1 class="text-4xl">Rachel and Izac</h1>
  <TimeTogether />
  <TimeMarried />
  <!-- <Countdown /> -->
</main>
