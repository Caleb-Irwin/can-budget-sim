<script lang="ts">
  import JarSet from "$lib/JarSet.svelte";
</script>

<JarSet
  jars={[
    { title: "Beer", amount: 10 },
    { title: "Milk", amount: 20 },
  ]}
  otherTitle="Other"
/>
