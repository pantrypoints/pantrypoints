<script lang="ts">
	import AppGridView from '$lib/components/Applist.svelte';
	import * as m from '$lib/paraglide/messages';
	let { data } = $props();
</script>


<AppGridView 
	items={data.items}
	title={m.services()}
	subtitle={m.ppservices()}
	badgeLabel={m.services()}
	basePath="/services"
	videoSrc="/quipu.mp4" 
/>


