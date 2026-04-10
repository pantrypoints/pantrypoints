<script lang="ts">
	import AppGridView from '$lib/components/Preneurlist.svelte';
	import * as m from '$lib/paraglide/messages';
	let { data } = $props();
</script>

<AppGridView 
	items={data.items}
	title={m.nav_preneur()}
	subtitle="SaaS for micro-small businesses"
	badgeLabel="Pantrypreneur"
	basePath="/pantrypreneur"
	videoSrc="/app.mp4" 
/>
