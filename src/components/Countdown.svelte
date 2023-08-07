<script>
  import { onMount, onDestroy } from "svelte";

  let targetDate = new Date("2023-10-14T12:00:00"); // Replace this with your target date and time
  let timeRemaining = targetDate.getTime() - Date.now();

  function updateCountdown() {
    timeRemaining = targetDate.getTime() - Date.now();
  }

  // Update the countdown every second
  const interval = setInterval(updateCountdown, 100);

  // Clear the interval when the component is destroyed
  onDestroy(() => clearInterval(interval));

  // Initial call to update the countdown when the component is created
  updateCountdown();
</script>

<svelte:head>
  <title>Countdown</title>
</svelte:head>

<main class="flex">
  {#if timeRemaining > 0}
    <h1>Wedding: &nbsp;</h1>
    <p>{Math.floor(timeRemaining / (1000 * 60 * 60 * 24))}d,&nbsp;</p>
    <p>{Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h,&nbsp;</p>
    <p>{Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))}m,&nbsp;</p>
    <p>{Math.floor((timeRemaining % (1000 * 60)) / 1000)}s,&nbsp;</p>
  {:else}
    <h1>Countdown is over!</h1>
  {/if}
</main>
