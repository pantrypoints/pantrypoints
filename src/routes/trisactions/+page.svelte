<script lang="ts">
	import AppGridView from '$lib/components/Applist.svelte';
	import * as m from '$lib/paraglide/messages';
	let { data } = $props();
</script>

<AppGridView 
	items={data.items}
	title={m.apps_title()}
	subtitle={m.apps_subtitle()}
	badgeLabel={m.trisactions()}
	basePath="/trisactions"
	videoSrc="/app.mp4" 
/>

