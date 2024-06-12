<script lang="ts">
  import JarSet from "./JarSet.svelte";

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
</script>

<h3 class="h3 text-center">
  Revenue of {year.totalRevenues
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} million
</h3>

<div class="flex flex-row items-center justify-center">
  <img src="/nickel.png" alt="" class="w-10" />
  <p class="font-bold pl-2 text-lg">
    = ${(year.totalRevenues * (1000000 / 50 / 20))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  </p>
</div>

{#key year}
  <JarSet
    jars={[
      { title: "Personal Income Tax", amount: year.personalIncomeTaxDollars },
      {
        title: "Corporate Income Tax",
        amount: year.corporateIncomeTaxDollars,
      },
      { title: "General Sales Tax", amount: year.gstDollars },
      { title: "Customs Duties", amount: year.customsDutiesDollars },
    ]}
    otherTitle="Other"
  />
{/key}
<div class="flex flex-row justify-center">
  <button
    class="btn btn-lg variant-glass-primary font-semibold mt-4"
    on:click={() => (year = actualYear)}>Reveal Revenue</button
  >
</div>
