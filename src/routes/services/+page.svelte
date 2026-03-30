<script lang="ts">
	import AppGridView from '$lib/components/Applist.svelte';
	import * as m from '$lib/paraglide/messages';
	let { data } = $props();
</script>

<AppGridView 
	items={data.items}
	title={m.nav_preneur()}
	subtitle={m.ppservices()}
	badgeLabel={m.services()}
	basePath="/services"
	videoSrc="/quipu.mp4" 
/>




<!-- <script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { Search, ArrowRight, Zap } from 'lucide-svelte';
	import { searchApps } from '$lib/services';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data } = $props();

	let query = $state('');
	let results = $derived(searchApps(query));

	const statusColors: Record<string, string> = {
		live: '#00BD6C',
		beta: '#FFA500',
		'coming-soon': '#94a3b8'
	};

	function statusLabel(status: string): string {
		if (status === 'live') return m.status_live();
		if (status === 'beta') return m.status_beta();
		return m.status_coming_soon();
	}

	function appName(app: typeof results[0]) {
		return languageTag() === 'zh' ? app.nameZh : app.name;
	}
	function appDesc(app: typeof results[0]) {
		return languageTag() === 'zh' ? app.descriptionZh : app.description;
	}
</script>

<svelte:head>
	<title>{m.services()} — Pantrypoints</title>
</svelte:head>

<div class="page-transition">



<div class="relative border-b border-slate-100 overflow-hidden">

	<video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover" >
		<source src="/quipu.mp4" type="video/mp4">
	</video>
	

	<div class="absolute inset-0 bg-black/50 z-0"></div>
	

	<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
				<Zap size={13} />
				{m.saas()}
			</div>
			<h1 class="font-display mb-3 text-4xl font-800 text-white sm:text-5xl drop-shadow-lg">{m.services()}</h1>
			<p class="mb-8 text-lg text-white/90 drop-shadow">{m.ppservices()}</p>

			<div class="relative mx-auto max-w-md">
				<Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" />
				<input
					type="search"
					bind:value={query}
					placeholder={m.apps_search_placeholder()}
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
				<p>{m.apps_none_found()}</p>
			</div>
		{:else}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each results as app, i (app.slug)}
					<a
						in:fly={{ y: 20, duration: 350, delay: i * 60 }}
						href="/services/{app.slug}"
						class="card-hover group block dark:hover:bg-gray-700 rounded-2xl border border-2 border-slate-400 bg-gray-100 dark:bg-gray-800 p-6 shadow-sm">
						<div class="mb-4 flex items-start justify-between">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
								style="background: {app.color}18">
								<img src="{app.icon}" alt="Icon">
							</div>
							<span
								class="rounded-full px-2.5 py-0.5 text-xs font-medium"
								style="background: {statusColors[app.status]}18; color: {statusColors[app.status]}">
								{statusLabel(app.status)}
							</span>
						</div>

						<h3 class="font-display mb-1.5 font-700 text-2xl text-slate-500 transition-colors group-hover:text-brand-blue">
							{appName(app)}
						</h3>
						<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
							{appDesc(app)}
						</p>

						<div class="mb-5 flex flex-wrap gap-1.5">
							{#each app.tags as tag}
								<span
									class="rounded-md px-2 py-0.5 text-xs font-medium"
									style="background: {app.color}12; color: {app.color}"
								>
									{tag}
								</span>
							{/each}
						</div>

						<div class="flex items-center gap-1 text-sm font-semibold" style="color: {app.color}">
							{m.apps_learn_more()} <ArrowRight size={14} />
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
 -->