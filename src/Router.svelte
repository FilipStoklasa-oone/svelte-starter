<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link class="text-red-500" to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>
  <div>
    <Route path="/">Home</Route>
    <Route path="/about">About</Route>
  </div>
</Router>
