<script lang="ts">
	import type { ContentArticle } from '$lib/content';

	export let article: ContentArticle;
</script>

<a
	href="/{article.lang === 'en' ? '' : article.lang + '/'}{article.type}/{article.slug}"
	class="group block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-200"
>
	<div class="flex justify-between items-start gap-2">
		<div class="flex-1">
			<h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
				{article.title}
			</h3>
			
			<div class="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
				<time datetime={article.date}>
					{new Date(article.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</time>
				
				{#if article.tags?.length}
					<span>•</span>
					<span class="truncate">
						{article.tags.slice(0, 2).join(', ')}
					</span>
				{/if}
			</div>
		</div>
		
		<span class="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 font-medium flex-shrink-0">
			{article.type}
		</span>
	</div>
</a>