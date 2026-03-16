<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ArrowLeft, CheckCircle, ExternalLink, Zap } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data } = $props();
	let app = $derived(data.app);

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

	let appName = $derived(languageTag() === 'zh' ? app.nameZh : app.name);
	let appDesc = $derived(languageTag() === 'zh' ? app.descriptionZh : app.description);
	let appLongDesc = $derived(languageTag() === 'zh' ? app.longDescriptionZh : app.longDescription);
	let appFeatures = $derived(languageTag() === 'zh' ? app.featuresZh : app.features);
</script>

<svelte:head>
	<title>{appName} — Pantrypoints</title>
</svelte:head>


<div class="page-transition">

	<!-- Hero banner -->
	<div
		class="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8"
		style="background: linear-gradient(135deg, {app.color}, {app.color}aa)">
		<div
			class="pointer-events-none absolute inset-0 opacity-10"
			style="background: radial-gradient(ellipse at 80% 0%, white 0%, transparent 60%)"
		></div>

		<div class="relative mx-auto max-w-5xl">
			<a href="/pantrypreneur"
				class="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
				<ArrowLeft size={15} /> {m.nav_apps()}
			</a>

			<div class="flex flex-col gap-6 md:flex-row md:items-center">
<!-- 				<div
					class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl"
					style="background: rgba(255,255,255,0.2)">
					{app.icon}
				</div> -->
				<div>
					<div class="mb-2 flex items-center gap-3">
						<h1 class="font-display text-4xl font-800">{appName}</h1>
						<span
							class="rounded-full px-3 py-1 text-xs font-semibold"
							style="background: rgba(255,255,255,0.2); color: white"
						>
							{statusLabel(app.status)}
						</span>
					</div>
					<p class="max-w-xl text-lg text-white/85">{appDesc}</p>
				</div>
			</div>

			<div class="mt-6 flex flex-wrap gap-2">
				{#each app.tags as tag}
					<span class="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white/90">
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-3">
			<!-- Left: description -->
			<div class="lg:col-span-2" in:fly={{ x: -20, duration: 400, delay: 100 }}>
				<!-- <h2 class="font-display mb-4 text-2xl font-700 text-slate-900">{m.apps_about()}</h2> -->
				<p class="leading-relaxed text-slate-600">{appLongDesc}</p>

				<!-- Mock screenshot with optional YouTube video -->
				<div
					class="mt-10 overflow-hidden rounded-2xl border border-slate-100"
					style="background: linear-gradient(135deg, {app.color}08, {app.color}18)"
				>
					<!-- Browser chrome -->
					<div class="flex items-center gap-1.5 border-b border-slate-100 bg-white px-4 py-3">
						<span class="h-3 w-3 rounded-full bg-red-300"></span>
						<span class="h-3 w-3 rounded-full bg-yellow-300"></span>
						<span class="h-3 w-3 rounded-full bg-green-300"></span>
						<span class="ml-3 flex-1 rounded bg-slate-100 px-3 py-1 text-xs text-slate-400">
							pantrypoints.com/{app.slug}
						</span>
					</div>
					
					<!-- Content container -->
					<div class="p-6">
						{#if app.youtube}
							<!-- YouTube video embed -->
							<div class="relative w-full" style="padding-bottom: 56.25%;"> <!-- 16:9 aspect ratio -->
								<iframe 
									src="https://www.youtube.com/embed/{app.youtube}" 
									title="YouTube video player" 
									frameborder="0" 
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
									allowfullscreen
									class="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
								></iframe>
							</div>
						{:else}
							<!-- Regular screenshot image -->
							<img 
								src="{app.img}" 
								alt="Screenshot of {app.name}" 
								class="w-full h-auto rounded-lg shadow-md"
							>
						{/if}
					</div>
				</div>
			</div>


			<!-- Right: features + CTA -->
			<div in:fly={{ x: 20, duration: 400, delay: 200 }}>
				<div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
					<h3 class="font-display mb-4 font-700 text-slate-900">{m.apps_key_features()}</h3>
					<ul class="space-y-3">
						{#each appFeatures as feature, i}
							<li
								in:fly={{ x: 10, duration: 300, delay: 300 + i * 50 }}
								class="flex items-start gap-2.5"
							>
								<CheckCircle size={16} class="mt-0.5 shrink-0" style="color: {app.color}" />
								<span class="text-sm text-slate-600">{feature}</span>
							</li>
						{/each}
					</ul>

					<div class="mt-8 space-y-3">
						{#if app.status !== 'coming-soon'}
							<a
								href="https://pantrypoints.com/{app.slug}"
								target="_blank"
								rel="noopener"
								class="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
								style="background: {app.color}"
							>
								<ExternalLink size={15} />
								{m.apps_visit()}
							</a>
						{/if}
						<a href="/pantrypreneur"
							class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300">
							<ArrowLeft size={15} />
							{m.apps_back()}
						</a>
					</div>
				</div>

				<div class="mt-4 rounded-2xl border p-4"
					style="background: {statusColors[app.status]}0a; border-color: {statusColors[app.status]}30">
					<div class="flex items-center gap-2 text-sm font-medium" style="color: {statusColors[app.status]}">
						<Zap size={14} />
						{m.status_label()}{statusLabel(app.status)}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
