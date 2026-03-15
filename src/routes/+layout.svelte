<script lang="ts">
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
