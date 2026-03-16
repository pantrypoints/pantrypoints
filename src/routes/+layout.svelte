<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { setLanguageTag } from '$lib/paraglide/runtime';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { data, children } = $props();

  // Sync on every render — runs on SSR and client
  setLanguageTag(data.lang as 'en' | 'zh');

  $effect(() => {
    // Re-sync when data.lang changes (after cookie switch + reload)
    setLanguageTag(data.lang as 'en' | 'zh');
  });
</script>

<div class="flex min-h-screen flex-col">
  <Nav lang={data.lang} />
  {#key $page.url.pathname}
    <main class="flex-1" in:fade={{ duration: 200 }}>
      {@render children()}
    </main>
  {/key}
  <Footer />
</div>


<!-- <script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { setLanguageTag } from '$lib/paraglide/runtime';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children } = $props();

	// Sync Paraglide language tag on client on every navigation
	$effect(() => {
		setLanguageTag(data.lang);
	});

	  // Re-sync on navigation
	  $effect(() => {
	    setLanguageTag(data.lang as 'en' | 'zh');
	  });
</script>

<div class="flex min-h-screen flex-col">
	<Nav lang={data.lang} />

	{#key $page.url.pathname}
		<main class="flex-1" in:fade={{ duration: 200 }}>
			{@render children()}
		</main>
	{/key}

	<Footer />
</div>


 -->