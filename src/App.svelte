<script lang="ts">
  import Router from "./Router.svelte";
  export let url = "";
</script>

<Router {url} />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
