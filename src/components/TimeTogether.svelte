<script>
  import { onMount, onDestroy } from "svelte";
  import { tick } from "svelte/internal";

  let interval;

  // calculate time difference
  const startDateTime = new Date("January 13, 2023 18:00:00").getTime();

  let timeElapsed = {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  function updateTimeElapsed() {
    const now = new Date().getTime();
    const timeDiff = now - startDateTime;

    timeElapsed.years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    timeElapsed.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) % 365;
    timeElapsed.hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    timeElapsed.minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    timeElapsed.seconds = Math.floor((timeDiff / 1000) % 60);
  }

  onMount(() => {
    updateTimeElapsed();
    interval = setInterval(() => {
      updateTimeElapsed();
      tick(); // trigger Svelte update
    }, 100);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="flex">
  <p>Time Together:&nbsp;</p>
  <!-- <p>{timeElapsed.years} years</p> -->
  <p>{timeElapsed.days}d,&nbsp;</p>
  <p>{timeElapsed.hours}h,&nbsp;</p>
  <p>{timeElapsed.minutes}m,&nbsp;</p>
  <p>{timeElapsed.seconds}s,&nbsp;</p>
</div>
