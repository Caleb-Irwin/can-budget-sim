<script lang="ts">
  import Page from "$lib/RevenuePage.svelte";
  import "$lib/data";
  import { data } from "$lib/data";

  let i = 0;
  $: year = data[i];
</script>

<svelte:head>
  <title>Canadian Federal Revenue</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
  <h1 class="h1 text-center">Canadian Federal Revenue</h1>

  <h2 class="text-center h2">
    <button disabled={i === 0} class="disabled:hidden" on:click={() => (i -= 1)}
      >←</button
    >
    <span class="">{year.year}</span>
    <button
      disabled={i === data.length - 1}
      class="disabled:hidden"
      on:click={() => (i += 1)}>→</button
    >
  </h2>

  {#key year}
    <Page {year} />
  {/key}

  {#if i === 0}
    <div class="card m-8 p-8 w-full max-w-lg">
      <span class="font-semibold text-lg">Tutorial</span>
      <ul>
        1. Guess the percentage of federal revenue that comes from each category
        using the sliders.
      </ul>
      <ul>2. Reveal the actual revenue percent.</ul>
      <ul>
        3. Read your score and press the right arrow to go to the next year.
      </ul>
    </div>
  {/if}
</div>
