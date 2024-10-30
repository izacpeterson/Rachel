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

<div class="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Time Together</h2>
  <div class="flex space-x-6">
    <div class="text-center">
      <p class="text-3xl font-semibold">{timeElapsed.years}</p>
      <p class="text-gray-500">Years</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-semibold">{timeElapsed.days}</p>
      <p class="text-gray-500">Days</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-semibold">{timeElapsed.hours}</p>
      <p class="text-gray-500">Hours</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-semibold">{timeElapsed.minutes}</p>
      <p class="text-gray-500">Minutes</p>
    </div>
    <div class="text-center">
      <p class="text-3xl font-semibold">{timeElapsed.seconds}</p>
      <p class="text-gray-500">Seconds</p>
    </div>
  </div>
</div>
