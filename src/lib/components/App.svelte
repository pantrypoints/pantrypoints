<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-svelte';
	import { t, getLocale } from '$lib/i18n';

	let { app, categoryUrl, categoryLabel } = $props();

	const statusColors: Record<string, string> = {
		live: '#00BD6C',
		beta: '#FFA500',
		'coming-soon': '#94a3b8'
	};

	function statusLabel(status: string): string {
		if (status === 'live') return t('status_live');
		if (status === 'beta') return t('status_beta');
		return t('status_coming_soon');
	}

	let appName = $derived(getLocale() === 'zh' ? app.nameZh : app.name);
	let appDesc = $derived(getLocale() === 'zh' ? app.descriptionZh : app.description);
	let appLongDesc = $derived(getLocale() === 'zh' ? app.longDescriptionZh : app.longDescription);
	let appFeatures = $derived(getLocale() === 'zh' ? app.featuresZh : app.features);
</script>

<svelte:head>
	<title>{appName} — Pantrypoints</title>
</svelte:head>

<div class="page-transition">
	<div 
		class="relative flex min-h-[400px] items-end overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8"
		style:background-color={app.color || '#00BD6C'}
	>
		<div class="absolute inset-0 z-0 flex items-center justify-center opacity-10">
			<img src={app.icon} alt="" class="h-96 w-96 object-contain grayscale brightness-0 invert" />
		</div>
		<div class="relative z-20 mx-auto w-full max-w-5xl">
			<a href={categoryUrl} class="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
				<ArrowLeft size={15} /> {categoryLabel}
			</a>
			<div class="flex flex-col gap-6 md:flex-row md:items-center">
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h1 class="font-display text-4xl font-800">{appName}</h1>
						<span class="rounded-full px-3 py-1 text-xs font-semibold" style="background: rgba(255,255,255,0.2)">
							{statusLabel(app.status)}
						</span>
					</div>
					<p class="max-w-xl text-lg text-white/85">{appDesc}</p>
				</div>
			</div>
			<div class="mt-6 flex flex-wrap gap-2">
				{#each app.tags as tag}
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white/90">{tag}</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-3">
			<div class="lg:col-span-2" in:fly={{ x: -20, duration: 400 }}>
				<p class="leading-relaxed text-slate-600">{appLongDesc}</p>
				<div class="mt-10 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
					<div class="p-6">
						{#if app.youtube}
							<div class="relative w-full overflow-hidden rounded-lg shadow-md" style="padding-bottom: 56.25%;">
								<iframe src="https://www.youtube.com/embed/{app.youtube}" title="Video" frameborder="0" allowfullscreen class="absolute inset-0 h-full w-full"></iframe>
							</div>
						{:else if app.img}
							<img src={app.img} alt={appName} class="h-auto w-full rounded-lg shadow-md" />
						{/if}
					</div>
				</div>
			</div>

			<div>
				<div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
					<h3 class="font-display mb-4 font-700 text-slate-900">{t('apps_key_features')}</h3>
					<ul class="space-y-3">
						{#each appFeatures as feature}
							<li class="flex items-start gap-2.5">
								<CheckCircle size={16} class="mt-0.5 shrink-0" style="color: {app.color}" />
								<span class="text-sm text-slate-600">{feature}</span>
							</li>
						{/each}
					</ul>
					<div class="mt-8 space-y-3">
						{#if app.url}
							<a href={app.url} target="_blank" class="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white" style="background: {app.color}">
								<ExternalLink size={15} /> {t('apps_visit')}
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>