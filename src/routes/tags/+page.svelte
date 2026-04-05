<script lang="ts">
	import type { PageData } from './$types';
	import TagCard from '$lib/components/Tagcard.svelte';
	import * as m from '$lib/paraglide/messages';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	
	let currentPage = $state(1);
	let itemsPerPage = $state(9); // 3x3 grid by default
	
	// Flatten all articles from all tags into a single array with tag info
	let allArticles = $derived(
		data.tags.flatMap(tag => 
			tag.articles.map(article => ({
				...article,
				tagName: tag.name,
				tagCount: tag.count
			}))
		)
	);
	
	// Remove duplicates if an article appears in multiple tags
	let uniqueArticles = $derived(
		Array.from(new Map(allArticles.map(article => [article.slug, article])).values())
	);
	
	// Pagination calculations
	let totalPages = $derived(Math.ceil(uniqueArticles.length / itemsPerPage));
	let paginatedArticles = $derived(
		uniqueArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);
	
	// Group paginated articles by tag for display
	let groupedByTag = $derived(() => {
		const grouped = new Map();
		paginatedArticles.forEach(article => {
			if (!grouped.has(article.tagName)) {
				grouped.set(article.tagName, {
					name: article.tagName,
					count: article.tagCount,
					articles: []
				});
			}
			grouped.get(article.tagName).articles.push(article);
		});
		return Array.from(grouped.values());
	});
	
	// Reset page when data changes
	$effect(() => {
		currentPage = 1;
	});
	
	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			const tagsSection = document.querySelector('.tags-section');
			tagsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};
	
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisible = 5;
		
		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push('...');
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push('...');
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push('...');
				for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
				pages.push('...');
				pages.push(totalPages);
			}
		}
		return pages;
	};
</script>


<svelte:head>
	<title>All Tags</title>
	<meta name="description" content="Browse all articles by tag" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-2">{m.browse_tags()}</h1>
	<p class="text-gray-600 dark:text-gray-400 mb-8">
		{m.articles_by_tags()}
	</p>

	{#if uniqueArticles.length === 0}
		<div class="py-20 text-center text-gray-400">
			<p>No articles found</p>
		</div>
	{:else}
		<!-- Results count info -->
		<div class="mb-6 text-sm text-gray-500">
			Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, uniqueArticles.length)} of {uniqueArticles.length} articles
		</div>
		
		<div class="tags-section space-y-12">
			{#each groupedByTag() as tag}
				<section class="border-b border-gray-200 dark:border-gray-700 pb-8">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-2xl font-semibold">
							<span class="text-blue-600 dark:text-blue-400">#</span>{tag.name}
						</h2>
						<span class="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
							{tag.count} article{tag.count !== 1 ? 's' : ''}
						</span>
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each tag.articles as article}
							<TagCard {article} />
						{/each}
					</div>
				</section>
			{/each}
		</div>
		
		<!-- Pagination Component -->
		{#if totalPages > 1}
			<div class="mt-12 flex flex-col items-center gap-4">
				<div class="flex items-center justify-center gap-2">
					<!-- Previous button -->
					<button
						onclick={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
						class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
					>
						<ChevronLeft size={18} />
					</button>
					
					<!-- Page numbers -->
					{#each getPageNumbers() as page}
						{#if page === '...'}
							<span class="flex h-10 w-10 items-center justify-center text-gray-400 dark:text-gray-600">...</span>
						{:else}
							<button
								onclick={() => goToPage(page as number)}
								class="flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg px-3 transition-all {currentPage === page
									? 'bg-blue-600 text-white shadow-md dark:bg-blue-500'
									: 'border border-gray-200 bg-white text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400'
								}"
							>
								{page}
							</button>
						{/if}
					{/each}
					
					<!-- Next button -->
					<button
						onclick={() => goToPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
					>
						<ChevronRight size={18} />
					</button>
				</div>
				
				<!-- Items per page selector -->
				<div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
					<span>Show:</span>
					<select
						bind:value={itemsPerPage}
						onchange={() => currentPage = 1}
						class="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-400"
					>
						<option value={6}>6</option>
						<option value={9}>9</option>
						<option value={12}>12</option>
						<option value={18}>18</option>
						<option value={24}>24</option>
					</select>
					<span>per page</span>
				</div>
			</div>
		{/if}
	{/if}
</div>