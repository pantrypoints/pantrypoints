<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { Search, ArrowRight, Zap } from 'lucide-svelte';
	import { t, getLocale } from '$lib/i18n';

	let { 
		items, 
		title, 
		subtitle, 
		badgeLabel, 
		videoSrc = '/app.mp4', 
		basePath 
	} = $props();

	let query = $state('');

	const results = $derived(
		items.filter((item: any) => {
			const q = query.toLowerCase().trim();
			if (!q) return true;
			return (
				item.name.toLowerCase().includes(q) ||
				item.description.toLowerCase().includes(q) ||
				item.nameZh?.includes(q) ||
				item.descriptionZh?.includes(q) ||
				item.tags.some((tag: string) => tag.toLowerCase().includes(q))
			);
		})
	);

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

	const getName = (item: any) => getLocale() === 'zh' ? item.nameZh : item.name;
	const getDesc = (item: any) => getLocale() === 'zh' ? item.descriptionZh : item.description;
</script>


<div class="page-transition">
	<div class="relative border-b border-slate-100 overflow-hidden">
		<video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
			<source src={videoSrc} type="video/mp4">
		</video>
		<div class="absolute inset-0 bg-black/50 z-0"></div>

		<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl">
				<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
					<Zap size={13} /> {badgeLabel}
				</div>
				<h1 class="font-display mb-3 text-4xl font-800 text-white sm:text-5xl drop-shadow-lg">{title}</h1>
				<p class="mb-8 text-lg text-white/90 drop-shadow">{subtitle}</p>

				<div class="relative mx-auto max-w-md">
					<Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" />
					<input 
						type="search" 
						bind:value={query} 
						placeholder={t('apps_search_placeholder')} 
						class="w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm py-3 pl-11 pr-4 text-sm text-white placeholder-white/70 transition-colors focus:border-white focus:ring-2 focus:ring-white/30 focus:outline-none" 
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
		{#if results.length === 0}
			<div in:fade={{ duration: 200 }} class="py-20 text-center text-slate-400">
				<Search size={40} class="mx-auto mb-4 opacity-40" />
				<p>{t('apps_none_found')}</p>
			</div>
		{:else}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each results as item, i (item.slug)}
					<a 
						in:fly={{ y: 20, duration: 350, delay: i * 60 }} 
						href="{basePath}/{item.slug}" 
						class="group block rounded-2xl border-t-4 border-teal-500 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"> 
						<div class="mb-4 flex items-start justify-between">
							<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 p-2 dark:bg-slate-800">
								<img src={item.icon} alt="" class="h-full w-full object-contain">
							</div>
							<span class="rounded-full px-2.5 py-0.5 text-xs font-medium" style="background: {statusColors[item.status]}18; color: {statusColors[item.status]}">
								{statusLabel(item.status)}
							</span>
						</div>

						<h3 class="font-display mb-1.5 text-xl font-bold dark:text-white group-hover:text-brand-blue">
							{getName(item)}
						</h3>
						<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
							{getDesc(item)}
						</p>

						<div class="mb-5 flex flex-wrap gap-1.5">
							{#each item.tags as tag}
								<span class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex items-center gap-1 text-sm font-semibold text-brand-blue">
							{t('apps_learn_more')} <ArrowRight size={14} />
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>