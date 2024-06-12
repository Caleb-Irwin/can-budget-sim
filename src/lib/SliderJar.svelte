<script lang="ts">
  import Jar from "$lib/Jar.svelte";
  import { RangeSlider } from "@skeletonlabs/skeleton";

  export let value = 10,
    disabled = false,
    title = "Amount",
    other: number = 50;

  $: {
    if (disabled) {
      internalValue = value;
    } else {
      const maxValue = other + value;
      if (internalValue > maxValue) {
        internalValue = Math.round(maxValue * 100) / 100;
      }
      value = internalValue;
    }
  }

  let internalValue = value;
</script>

<div class="flex flex-col items-center p-2">
  <RangeSlider
    class="w-full px-10"
    name="range-slider"
    bind:value={internalValue}
    max={50}
    step={0.05}
    {disabled}
  >
    <div class="flex justify-between items-center">
      <div class="font-bold">{title}</div>
      <div class="text-xs">${value}</div>
    </div>
  </RangeSlider>
  <Jar amountCents={value * 100} />
</div>
