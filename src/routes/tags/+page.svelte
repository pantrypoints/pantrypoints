<script lang="ts">
	import type { PageData } from './$types';
	import TagCard from '$lib/components/Tagcard.svelte';

	export let data: PageData;
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

	<div class="space-y-12">
		{#each data.tags as tag}
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
</div>