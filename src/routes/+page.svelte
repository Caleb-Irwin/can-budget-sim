<script lang="ts">
  import Page from "$lib/RevenuePage.svelte";
  import "$lib/data";
  import { data } from "$lib/data";

  let i = 0;
  $: year = data[i];
</script>

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
</div>
