<script lang="ts">
  import SliderJar from "./SliderJar.svelte";

  export let year: {
    year: number;
    personalIncomeTaxDollars: number;
    corporateIncomeTaxDollars: number;
    gstDollars: number;
    customsDutiesDollars: number;
    totalRevenues: number;
  };

  const actualYear = year;

  year = {
    year: actualYear.year,
    totalRevenues: actualYear.totalRevenues,
    personalIncomeTaxDollars: 10,
    corporateIncomeTaxDollars: 10,
    gstDollars: 10,
    customsDutiesDollars: 10,
  };

  let revealed = false,
    guess: undefined | ReturnType<typeof yearToJars> = undefined;

  function yearToJars(y: typeof year) {
    return [
      { title: "Personal Income Tax", amount: y.personalIncomeTaxDollars },
      {
        title: "Corporate Income Tax",
        amount: y.corporateIncomeTaxDollars,
      },
      { title: "General Sales Tax", amount: y.gstDollars },
      { title: "Customs Duties", amount: y.customsDutiesDollars },
    ];
  }

  let jars = yearToJars(year);
  let otherTitle = "Other Revenue";
  $: other =
    Math.round((50 - jars.reduce((a, b) => a + b.amount, 0)) * 100) / 100;

  $: score =
    guess !== undefined
      ? Math.abs(
          (1 -
            Math.round(
              jars
                .map((j, i) =>
                  Math.abs(j.amount - (guess as typeof jars)[i].amount)
                )
                .reduce((prev, curr) => prev + curr, 0)
            ) /
              2 /
              50) *
            100
        )
      : undefined;
</script>

<h3 class="h3 text-center">
  Revenue of {year.totalRevenues
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} million
</h3>

<div class="flex flex-row items-center justify-center pb-4">
  <img src="/nickel.png" alt="" class="w-10" />
  <p class="font-bold pl-2 text-lg">
    = ${(year.totalRevenues * (1000000 / 50 / 20))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  </p>
</div>

<div
  class="container h-full mx-auto flex flex-row flex-wrap justify-center items-center"
>
  {#each jars as jar, i}
    <SliderJar
      bind:value={jar.amount}
      {other}
      title={jar.title}
      disabled={guess !== undefined}
      guessAmount={guess ? guess[i].amount : undefined}
    />
  {/each}
  <SliderJar
    value={other}
    disabled
    title={otherTitle}
    guessAmount={guess
      ? Math.round((50 - guess.reduce((a, b) => a + b.amount, 0)) * 100) / 100
      : undefined}
  />
</div>

{#if guess === undefined}
  <div class="flex flex-row justify-center">
    <button
      class="btn btn-lg variant-glass-primary font-semibold mt-4"
      on:click={() => {
        revealed = true;
        guess = jars;
        jars = yearToJars(actualYear);
      }}>Reveal Revenue</button
    >
  </div>
{:else if score}
  <div class="h-10 text-2xl font-semibold text-primary-500">
    Score: {score < 0 ? "0" : score}%
  </div>
{/if}
