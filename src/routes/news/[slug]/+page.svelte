<script lang="ts">
	import ContentDetail from '$lib/components/Content.svelte';
	
	let { data } = $props();
</script>

<ContentDetail 
	article={data.article}
	content={data.content}
	contentType="news"
/>
