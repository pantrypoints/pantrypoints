<script lang="ts">
	import { Calendar, User, Tag, ArrowLeft } from 'lucide-svelte';
	import { formatDate } from '$lib/content';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';
	
	let { 
		article,
		content,
		contentType = 'news' as 'news' | 'docs'
	} = $props();
	
	// Determine if we have a hero image
	const hasImage = $derived(article.image && article.image.length > 0);
	const backLink = $derived(`/${contentType}`);
</script>

<svelte:head>
	<title>{article.title} — Pantrypoints</title>
	<meta name="description" content={article.description} />
</svelte:head>

<div class="page-transition">
	<div 
		class="relative flex min-h-[400px] items-end overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8"
		style:background-color={hasImage ? '#008080' : '#008000'}
	>
		{#if hasImage}
			<!-- Background image -->
			<div 
				class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
				style="background-image: url({article.image});"
			></div>
			<!-- Gradient overlay for entire hero -->
			<div class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
			
			<!-- Text content with additional dark background for better contrast -->
			<div class="relative z-20 mx-auto w-full max-w-3xl">
				<!-- Semi-transparent black background behind all text -->
				<div class="rounded-xl bg-black/50 p-6 backdrop-blur-sm sm:p-8">
					<a 
						href={backLink}	
						class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
					>
						<ArrowLeft size={16} />
						{m.news_back_to_list()}
					</a>

					<h1 class="font-display mb-4 text-4xl font-800 text-white sm:text-5xl lg:text-6xl">
						{article.title}
					</h1>

					{#if article.description}
						<div class="text-xl text-white">
							<p>{article.description}</p>
						</div>
					{/if}

					<div class="flex flex-wrap items-center pt-6 gap-6 text-sm font-medium text-white/90">
						<span class="flex items-center gap-1.5">
							<Calendar size={16} class="text-white/70" />
							{formatDate(article.date, languageTag())}
						</span>
						<span class="flex items-center gap-1.5">
							<User size={16} class="text-white/70" />
							{article.author}
						</span>
					</div>

					{#if article.tags?.length > 0}
						<div class="mt-4 flex flex-wrap gap-2">
							{#each article.tags as tag}
								<span class="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
									<Tag size={10} />
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<!-- No image version -->
			<div class="absolute inset-0 z-0 flex items-center justify-center opacity-10">
				<img 
					src="/icons/pantry.png" 
					alt="" 
					class="h-96 w-96 object-contain grayscale brightness-0 invert"
				/>
			</div>
			
			<div class="relative z-20 mx-auto w-full max-w-3xl">
				<a	
					href={backLink}	
					class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
				>
					<ArrowLeft size={16} />
					{m.news_back_to_list()}
				</a>

				<h1 class="font-display mb-6 text-4xl font-800 text-white sm:text-5xl lg:text-6xl">
					{article.title}
				</h1>

				{#if article.description}
					<div class="mb-6 text-xl text-white">
						<p>{article.description}</p>
					</div>
				{/if}

				<div class="flex flex-wrap items-center gap-6 text-sm font-medium text-white/90">
					<span class="flex items-center gap-1.5">
						<Calendar size={16} class="text-white/70" />
						{formatDate(article.date, languageTag())}
					</span>
					<span class="flex items-center gap-1.5">
						<User size={16} class="text-white/70" />
						{article.author}
					</span>
				</div>

				{#if article.tags?.length > 0}
					<div class="mt-6 flex flex-wrap gap-2">
						{#each article.tags as tag}
							<span class="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
								<Tag size={10} />
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="prose prose-slate prose-green max-w-none dark:prose-invert md:prose-lg">
			{@html content}
		</div>
	</article>
</div>

<style>
	/* Ensures the hero remains punchy but readable */
	.font-display {
		text-wrap: balance;
		line-height: 1.1;
	}
</style>