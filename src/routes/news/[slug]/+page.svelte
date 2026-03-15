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
		@apply text-brand-green hover:underline;
	}
</style> -->


<!-- <script lang="ts">
	import { fly } from 'svelte/transition';
	import { ArrowLeft, Calendar, User } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';
	import { formatDate } from '$lib/news';

	let { data } = $props();
	let slug = $derived(data.slug);

	let ArticleComponent: unknown = $state(null);
	let meta: Record<string, unknown> = $state({});
	let loading = $state(true);
	let notFound = $state(false);

	$effect(() => {
		loading = true;
		notFound = false;

		const enModules = import.meta.glob('/src/content/en/*.md');
		const zhModules = import.meta.glob('/src/content/zh/*.md');
		const lang = languageTag();
		const modules = lang === 'zh' ? zhModules : enModules;
		const key = lang === 'zh'
			? `/src/content/zh/${slug}.md`
			: `/src/content/en/${slug}.md`;

		const loader = modules[key] ?? enModules[`/src/content/en/${slug}.md`];

		if (loader) {
			loader().then((mod) => {
				const mod2 = mod as { default: unknown; metadata: Record<string, unknown> };
				ArticleComponent = mod2.default;
				meta = mod2.metadata ?? {};
				loading = false;
			}).catch(() => {
				notFound = true;
				loading = false;
			});
		} else {
			notFound = true;
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>{String(meta.title ?? slug)} — Pantrypoints</title>
	{#if meta.description}
		<meta name="description" content={String(meta.description)} />
	{/if}
</svelte:head>

<div class="page-transition">
	<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
		<a
			href="/news"
			class="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-green"
		>
			<ArrowLeft size={15} /> {m.news_back()}
		</a>

		{#if loading}
			<div class="flex items-center justify-center py-32">
				<div class="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent"></div>
			</div>
		{:else if notFound}
			<div class="py-32 text-center">
				<h2 class="font-display text-2xl font-700 text-slate-900">{m.news_not_found()}</h2>
				<a href="/news" class="mt-4 inline-block text-brand-green hover:underline">{m.news_back()}</a>
			</div>
		{:else}
			<article in:fly={{ y: 20, duration: 400 }}>
				<header class="mb-10">
					{#if meta.tags && Array.isArray(meta.tags)}
						<div class="mb-4 flex flex-wrap gap-2">
							{#each meta.tags as tag}
								<span class="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-brand-green">
									{tag}
								</span>
							{/each}
						</div>
					{/if}

					<h1 class="font-display mb-4 text-4xl leading-tight font-800 text-slate-900">
						{meta.title ?? slug}
					</h1>

					{#if meta.description}
						<p class="mb-6 text-lg leading-relaxed text-slate-500">{meta.description}</p>
					{/if}

					<div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
						{#if meta.date}
							<span class="flex items-center gap-1.5">
								<Calendar size={14} />
								{formatDate(String(meta.date), languageTag())}
							</span>
						{/if}
						{#if meta.author}
							<span class="flex items-center gap-1.5">
								<User size={14} />
								{meta.author}
							</span>
						{/if}
					</div>
				</header>

				<div class="prose prose-slate max-w-none
					prose-headings:font-display prose-headings:font-700
					prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline
					prose-blockquote:border-brand-green prose-blockquote:bg-green-50 prose-blockquote:py-1 prose-blockquote:rounded-r-xl
					prose-strong:text-slate-800
					prose-code:bg-slate-100 prose-code:px-1.5 prose-code:rounded prose-code:text-brand-blue">
					{#if ArticleComponent}
						<svelte:component this={ArticleComponent} />
					{/if}
				</div>
			</article>
		{/if}
	</div>
</div>
 -->