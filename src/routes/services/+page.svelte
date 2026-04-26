<script lang="ts">
	import AppGridView from '$lib/components/Applist.svelte';
	import { t } from '$lib/i18n';
	let { data } = $props();
</script>


<AppGridView 
	items={data.items}
	title={t('services')}
	subtitle={t('ppservices')}
	badgeLabel={t('services')}
	basePath="/services"
	videoSrc="/quipu.mp4" 
/>


