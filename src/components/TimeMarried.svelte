<script>
  import { onMount, onDestroy } from "svelte";
  import { tick } from "svelte/internal";

  let interval;

  // calculate time difference
  const startDateTime = new Date("October 16, 2023 11:00:00").getTime();

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
  <p class="font-bold">Time Married:&nbsp;</p>
  <p>{timeElapsed.years} year&nbsp;</p>
  <p>{timeElapsed.days} days,&nbsp;</p>
  <p>{timeElapsed.hours} hours,&nbsp;</p>
  <p>{timeElapsed.minutes} minutes,&nbsp;</p>
  <p>{timeElapsed.seconds} seconds,&nbsp;</p>
</div>
