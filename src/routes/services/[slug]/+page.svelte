<script lang="ts">
	import AppDetailView from '$lib/components/App.svelte';
	import { t } from '$lib/i18n';
	let { data } = $props();
</script>

<AppDetailView 
	app={data.app} 
	categoryUrl="/services" 
	categoryLabel={t('services')} />