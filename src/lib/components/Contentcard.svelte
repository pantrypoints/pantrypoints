<script lang="ts">
  import { Calendar, Tag } from 'lucide-svelte';
  import { formatDate } from '$lib/content';
  import { languageTag } from '$lib/paraglide/runtime';
  
  export let article: any;
  export let contentType: 'news' | 'docs' = 'news';
  export let index: number = 0;
  
  const getHref = () => `/${contentType}/${article.slug}`;
</script>

<a
  in:fly={{ y: 15, duration: 350, delay: index * 60 }}
  href={getHref()}
  class="group block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200"
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex-1 min-w-0">
      <span class="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 font-medium">
        {article.type}
      </span>
      
      <h3 class="text-base font-semibold mt-1 text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {article.title}
      </h3>
      
      <div class="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
        <time class="flex items-center gap-1" datetime={article.date}>
          <Calendar size={12} />
          {formatDate(article.date, languageTag())}
        </time>
        
        {#if article.tags?.length}
          <div class="flex flex-wrap items-center gap-2">
            {#each article.tags.slice(0, 2) as tag}
              <span class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800">
                <Tag size={10} />
                {tag}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    
    {#if article.image}
      <img
        src={article.image}
        alt={article.title}
        class="w-12 h-12 rounded-md object-cover flex-shrink-0"
      />
    {/if}
  </div>
</a>