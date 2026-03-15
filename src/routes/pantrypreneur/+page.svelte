<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { Search, ArrowRight, Zap } from 'lucide-svelte';
	import { searchApps } from '$lib/apps';
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
	<title>{m.apps_title()} — Pantrypoints</title>
</svelte:head>

<div class="page-transition">
	<!-- Header -->
	<div class="border-b border-slate-100 bg-white px-4 py-14 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-brand-blue">
				<Zap size={13} />
				{m.apps_badge()}
			</div>
			<h1 class="font-display mb-3 text-4xl font-800 text-slate-900 sm:text-5xl">{m.apps_title()}</h1>
			<p class="mb-8 text-lg text-slate-500">{m.apps_subtitle()}</p>

			<div class="relative mx-auto max-w-md">
				<Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
				<input
					type="search"
					bind:value={query}
					placeholder={m.apps_search_placeholder()}
					class="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
				/>
			</div>
		</div>
	</div>

	<!-- Apps grid -->
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
						href="/apps/{app.slug}"
						class="card-hover group block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
					>
						<div class="mb-4 flex items-start justify-between">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
								style="background: {app.color}18"
							>
								{app.icon}
							</div>
							<span
								class="rounded-full px-2.5 py-0.5 text-xs font-medium"
								style="background: {statusColors[app.status]}18; color: {statusColors[app.status]}"
							>
								{statusLabel(app.status)}
							</span>
						</div>

						<h3 class="font-display mb-1.5 font-700 text-slate-900 transition-colors group-hover:text-brand-blue">
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
