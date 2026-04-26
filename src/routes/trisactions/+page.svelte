<script lang="ts">
	import AppGridView from '$lib/components/Applist.svelte';
	import { t } from '$lib/i18n';
	let { data } = $props();
</script>

<AppGridView 
	items={data.items}
	title={t('apps_title')}
	subtitle={t('apps_subtitle')}
	badgeLabel={t('trisactions')}
	basePath="/trisactions"
	videoSrc="/app.mp4" 
/>
