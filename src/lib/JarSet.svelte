<script lang="ts">
  import SliderJar from "$lib/SliderJar.svelte";

  export let jars: { title: string; amount: number }[] = [],
    otherTitle: string,
    guess: { title: string; amount: number }[] | undefined;

  $: other =
    Math.round((50 - jars.reduce((a, b) => a + b.amount, 0)) * 100) / 100;
</script>

<div
  class="container h-full mx-auto flex flex-row flex-wrap justify-center items-center"
>
  {#each jars as { title, amount }, i}
    <SliderJar
      bind:value={amount}
      {other}
      {title}
      disabled={guess !== undefined}
      guessAmount={guess ? guess[i].amount : undefined}
    />
  {/each}
  <SliderJar
    value={other}
    disabled
    title={otherTitle}
    guessAmount={guess ? guess.reduce((a, b) => a + b.amount, 0) : undefined}
  />
</div>
