<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="news"
  vid="/vid.mp4"
  title={m.news_title()}
  subtitle={m.news_subtitle()}
  badgeText={m.news_badge()}
/>




<!-- <script lang="ts">
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
	<title>{m.news_title()} — Pantrypoints</title>
</svelte:head>

<div class="page-transition">
<div class="relative overflow-hidden border-b border-slate-100">
	<video 
		autoplay 
		muted 
		loop 
		playsinline
		class="absolute inset-0 h-full w-full object-cover"
	>
		<source src="/vid.mp4" type="video/mp4">
	</video>
	
	<div class="absolute inset-0 z-0 bg-black/50"></div>
	
	<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
				<Newspaper size={13} class="text-brand-green" />
				{m.news_badge()}
			</div>
			
			<h1 class="font-display mb-3 text-4xl font-800 text-white drop-shadow-lg sm:text-5xl">
				{m.news_title()}
			</h1>
			
			<p class="mb-8 text-lg text-white/90 drop-shadow-md">
				{m.news_subtitle()}
			</p>

			<div class="relative mx-auto max-w-md">
				<Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" />
				<input
					type="search"
					bind:value={query}
					placeholder={m.news_search_placeholder()}
					class="w-full rounded-xl border border-white/30 bg-white/20 py-3 pl-11 pr-4 text-sm text-white placeholder-white/70 backdrop-blur-md transition-colors focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
				/>
			</div>
		</div>
	</div>
</div>



	<div class="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
		{#if results.length === 0}
			<div in:fade={{ duration: 200 }} class="py-20 text-center text-slate-400">
				<Newspaper size={40} class="mx-auto mb-4 opacity-40" />
				<p>{m.news_none_found()}</p>
			</div>
		{:else}
			<div class="space-y-6">
				{#each results as article, i (article.slug)}

					<a in:fly={{ y: 15, duration: 350, delay: i * 60 }}
						href="/news/{article.slug}"
						class="card-hover group flex flex-col overflow-hidden rounded-2xl border border-2 border-slate-400 dark:bg-gray-800 bg-white shadow-sm transition-all sm:flex-row">
						<div class="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48 md:w-64">
							{#if article.image}
								<img
									src={article.image}
									alt={article.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center bg-teal-500/10">
									<img
										src={article.icon || '/icons/pantry.png'}
										alt="icon"
										class="h-16 w-16 object-contain opacity-80 transition-transform group-hover:scale-110"
									/>
								</div>
							{/if}
						</div>

						<div class="flex flex-1 flex-col justify-between p-6 sm:p-7">
							<div>
								<h2 class="font-display mb-2 text-xl font-700 dark:text-white text-slate-900 transition-colors group-hover:text-brand-green">
									{article.title}
								</h2>
								<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
									{article.description}
								</p>
							</div>

							<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
								<div class="flex flex-wrap items-center gap-3 text-xs text-slate-400">
									<span class="flex items-center gap-1">
										<Calendar size={12} />
										{formatDate(article.date, languageTag())}
									</span>
									{#if article.tags}
										{#each article.tags.slice(0, 3) as tag}
											<span class="flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-brand-green">
												<Tag size={10} />
												{tag}
											</span>
										{/each}
									{/if}
								</div>

								<div
									class="shrink-0 self-start rounded-xl px-4 py-2 text-sm font-semibold transition-all group-hover:bg-brand-green group-hover:text-white"
									style="background: #00BD6C12; color: #00BD6C"
								>
									{m.news_read_more()}
								</div>
							</div>
						</div>
					</a>

				{/each}
			</div>
		{/if}
	</div>
</div>
 -->