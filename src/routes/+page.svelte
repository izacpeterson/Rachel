<script>
  import * as fb from "../lib/firebase";
  import TimeTogether from "../components/TimeTogether.svelte";

  function getTimeSinceJan132023() {
    const targetDate = new Date("2023-01-13T18:00:00"); // Set target date to Jan 13 2023 at 6pm
    const now = new Date(); // Get current date and time
    const timeDiff = now.getTime() - targetDate.getTime(); // Calculate time difference in milliseconds

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Calculate number of days
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24); // Calculate number of hours
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60); // Calculate number of minutes

    return { days, hours, minutes }; // Return result as object
  }
</script>

<main class="flex flex-col items-center justify-center h-full">
  <h1 class="text-4xl">Rachel and Izac</h1>
  <!-- <p>Our Journey</p> -->
  <!-- <p class="text-2xl">{getTimeSinceJan132023()} Days Together</p> -->
  <TimeTogether />
</main>
