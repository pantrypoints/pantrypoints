<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>404 | Pantrypoints</title>
	<meta name="description" content="The page you are looking for could not be found." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
	<div 
		class="font-display mb-4 text-8xl font-800" 
		style="background: linear-gradient(135deg, #3c95d3, #00BD6C); -webkit-background-clip: text; -webkit-text-fill-color: transparent"
	>
		{$page.status}
	</div>
	<h1 class="font-display mb-2 text-2xl font-700 text-slate-900">
		{$page.error?.message ?? t('error_occurred')}
	</h1>
	<p class="mb-8 text-slate-500">
		{t('page_not_found')}
	</p>
	<a 
		href="/" 
		class="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90" 
		style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)"
	>
		<ArrowLeft size={15} />
		{t('nav_home')}
	</a>
</div>