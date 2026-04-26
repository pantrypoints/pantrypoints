<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { setLocale } from '$lib/i18n';
  import type { Locale } from '$lib/types';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { data, children } = $props();

  setLocale(data.lang as Locale);

  $effect(() => {
    setLocale(data.lang as Locale);
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
import { setLocale, loadTranslations } from '$lib/i18n';
import { page } from '$app/stores';
import { fade } from 'svelte/transition';
import Nav from '$lib/components/Nav.svelte';
import Footer from '$lib/components/Footer.svelte';

let { data, children } = $props();

// Load translations from data
$effect(() => {
  if (data?.translations && data?.lang) {
    loadTranslations(data.lang, data.translations);
    setLocale(data.lang);
  }
});
</script>

<div class="flex min-h-screen flex-col">
  <Nav lang={data?.lang || 'en'} />
  {#key $page.url.pathname}
    <main class="flex-1" in:fade={{ duration: 200 }}>
      {@render children()}
    </main>
  {/key}
  <Footer />
</div> -->



<!--gemini <script lang="ts">
	import '../app.css';
	import { locale } from '$lib/i18n';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// 1. Fixed duplicate declaration
	let { data, children } = $props();

	// 2. Sync Rosetta locale on the server/initial render
	// This ensures the first HTML paint has the correct language
	locale.set(data.lang);

	// 3. Reactively update Rosetta if the language changes
	$effect(() => {
		if (data.lang) {
			locale.set(data.lang);
		}
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
</div> -->