<script lang="ts">
	import AppGridView from '$lib/components/Preneurlist.svelte';
	import { t } from '$lib/i18n';
	let { data } = $props();
</script>

<AppGridView 
	items={data.items}
	title={t('nav_preneur')}
	subtitle="SaaS for micro-small businesses"
	badgeLabel="Pantrypreneur"
	basePath="/pantrypreneur"
	videoSrc="/app.mp4" 
/>
