<script>
  import Jar from "$lib/Jar.svelte";
  import { RangeSlider } from "@skeletonlabs/skeleton";

  let value = 10;
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
  <RangeSlider name="range-slider" bind:value max={50} step={0.05}>
    <div class="flex justify-between items-center">
      <div class="font-bold">Amount</div>
      <div class="text-xs">${value}</div>
    </div>
  </RangeSlider>
  <Jar amountCents={value * 100} />
</div>
