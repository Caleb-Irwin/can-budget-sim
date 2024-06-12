<script lang="ts">
  import SliderJar from "$lib/SliderJar.svelte";

  export let jars: { title: string; amount: number }[] = [],
    otherTitle: string;

  $: other =
    Math.round((50 - jars.reduce((a, b) => a + b.amount, 0)) * 100) / 100;
</script>

<div
  class="container h-full mx-auto flex flex-row flex-wrap justify-center items-center"
>
  {#each jars as { title, amount }}
    <SliderJar bind:value={amount} {other} {title} />
  {/each}
  <SliderJar value={other} disabled title={otherTitle} />
</div>
