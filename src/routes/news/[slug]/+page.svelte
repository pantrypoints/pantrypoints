<script lang="ts">
  import { Calendar, User, Tag, ArrowLeft } from 'lucide-svelte';
  import { formatDate } from '$lib/news';
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime';

  // Svelte 5 style (since you used $props())
  let { data } = $props();
  
  // Destructure from data reactively
	const article = $derived(data.article);
	const content = $derived(data.content);
</script>


<svelte:head>
	<title>{article.title} — Pantrypoints</title>
	<meta name="description" content={article.description} />
</svelte:head>




<div class="page-transition">
	<!-- Back button -->
	<div class="border-b border-slate-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<a 
				href="/news" 
				class="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-green transition-colors"
			>
				<ArrowLeft size={16} />
				{m.news_back_to_list()}
			</a>
		</div>
	</div>

	<!-- Article content -->
	<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
		<header class="mb-8 text-center">
			<h1 class="font-display mb-4 text-4xl font-800 text-slate-900 sm:text-5xl">
				{article.title}
			</h1>
			
			<div class="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
				<span class="flex items-center gap-1">
					<Calendar size={14} />
					{formatDate(article.date, languageTag())}
				</span>
				<span class="flex items-center gap-1">
					<User size={14} />
					{article.author}
				</span>
			</div>

			{#if article.tags?.length > 0}
				<div class="mt-4 flex flex-wrap justify-center gap-2">
					{#each article.tags as tag}
						<span class="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs text-brand-green">
							<Tag size={10} />
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		{#if article.description}
			<div class="mb-8 rounded-lg bg-green-50 p-4 text-slate-600">
				<p class="italic">{article.description}</p>
			</div>
		{/if}

		
		<div class="prose prose-slate prose-green max-w-none dark:prose-invert">
    		{@html content}
		</div>

	</article>
</div>

<!-- <style>
	@reference "/src/app.css";

	:global(.prose) {
		@apply text-slate-700;
	}
	:global(.prose h2) {
		@apply font-display text-2xl font-700 text-slate-900 mt-8 mb-4;
	}
	:global(.prose h3) {
		@apply font-display text-xl font-600 text-slate-900 mt-6 mb-3;
	}
	:global(.prose p) {
		@apply leading-relaxed mb-4;
	}
	:global(.prose a) {
	@apply text-brand-green hover:underline;nav.
	}
</style> -->

