<script lang="ts">
  import Jar from "$lib/Jar.svelte";
  import { RangeSlider } from "@skeletonlabs/skeleton";

  export let value = 10,
    disabled = false,
    title = "Amount",
    other: number = 50,
    guessAmount: number | undefined;

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

  $: percentOff =
    guessAmount !== undefined
      ? value === 0
        ? guessAmount === 0
          ? 0
          : -Infinity
        : Math.round(((value - guessAmount) / value) * 100)
      : undefined;
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

  {#if guessAmount !== undefined}
    <p
      class="text-lg {percentOff === undefined
        ? ''
        : Math.abs(percentOff) < 20 || Math.abs(value - guessAmount) < 3
          ? 'text-green-500'
          : 'text-red-500'}"
    >
      <span class="font-bold"
        >${Math.round((value - guessAmount) * 100) / 100}</span
      >
      {percentOff}%
    </p>
  {/if}
</div>
