<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { Search, Newspaper, Calendar, Tag } from 'lucide-svelte';
	import { searchContent, formatDate } from '$lib/content';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	let { data } = $props();

	let query = $state('');
	let results = $derived(searchContent(data.articles, query));
</script>

<svelte:head>
	<title>Privacy Policy</title>
</svelte:head>

<div class="page-transition">
	<!-- Header -->
	<div class="border-b border-slate-100 bg-white px-4 py-14 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-sm font-medium text-brand-green">
				<Newspaper size={13} />
				{m.news_badge()}
			</div>
			<h1 class="font-display mb-3 text-4xl font-800 text-slate-900 sm:text-5xl">Privacy Policies</h1>
			<p class="mb-8 text-lg text-slate-500">{m.news_subtitle()}</p>

			<div class="relative mx-auto max-w-md">
				<Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
				<input
					type="search"
					bind:value={query}
					placeholder={m.news_search_placeholder()}
					class="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm transition-colors focus:border-brand-green focus:ring-2 focus:ring-green-100 focus:outline-none"
				/>
			</div>
		</div>
	</div>

	<!-- Articles -->
	<div class="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
		{#if results.length === 0}
			<div in:fade={{ duration: 200 }} class="py-20 text-center text-slate-400">
				<Newspaper size={40} class="mx-auto mb-4 opacity-40" />
				<p>{m.news_none_found()}</p>
			</div>
		{:else}
			<div class="space-y-6">
				{#each results as article, i (article.slug)}
					<a
						in:fly={{ y: 15, duration: 350, delay: i * 60 }}
						href="/privacy/{article.slug}"
						class="card-hover group block rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
					>
						<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div class="flex-1">
								<h2 class="font-display mb-2 text-xl font-700 text-slate-900 transition-colors group-hover:text-brand-green">
									{article.title}
								</h2>
								<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
									{article.description}
								</p>
								<div class="flex flex-wrap items-center gap-3 text-xs text-slate-400">
									<span class="flex items-center gap-1">
										<Calendar size={12} />
										{formatDate(article.date, languageTag())}
									</span>
									{#each article.tags.slice(0, 3) as tag}
										<span class="flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-brand-green">
											<Tag size={10} />
											{tag}
										</span>
									{/each}
								</div>
							</div>
							<div
								class="shrink-0 self-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-brand-green group-hover:text-white sm:self-start"
								style="background: #00BD6C12; color: #00BD6C"
							>
								{m.news_read_more()}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
