<script lang="ts">
	import AppDetailView from '$lib/components/App.svelte';
	let { data } = $props();
</script>

<AppDetailView 
	app={data.app} 
	categoryUrl="/trisactions" 
	categoryLabel="Apps" />

