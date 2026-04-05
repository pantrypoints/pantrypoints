<script lang="ts">
	import AppDetailView from '$lib/components/App.svelte';
	import * as m from '$lib/paraglide/messages';
	let { data } = $props();
</script>

<AppDetailView 
	app={data.app} 
	categoryUrl="/pantrypreneur" 
	categoryLabel={m.preneurapps()} />
