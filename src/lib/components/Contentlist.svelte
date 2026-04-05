<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Search, Newspaper, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { searchContent, formatDate } from '$lib/content';
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime';
  
  let { 
    articles = [],
    contentType = 'news',
    title,
    subtitle,
    badgeText,
    vid
  } = $props();
  
  let query = $state('');
  let currentPage = $state(1);
  let itemsPerPage = $state(6); // Adjust as needed
  
  // Get all search results
  let allResults = $derived(searchContent(articles, query));
  
  // Calculate pagination
  let totalPages = $derived(Math.ceil(allResults.length / itemsPerPage));
  let paginatedResults = $derived(
    allResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );
  
  // Reset to first page when search query changes
  $effect(() => {
    currentPage = 1;
  });
  
  const getHref = (slug: string) => `/${contentType}/${slug}`;
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      // Scroll to top of articles section
      const articlesSection = document.querySelector('.articles-section');
      articlesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  <title>{title} — Pantrypoints</title>
</svelte:head>

<div class="page-transition">
  <!-- Hero Section -->
  <div class="relative overflow-hidden border-b border-slate-100">
    <video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover">
      <source src="{vid}" type="video/mp4">
    </video>
    <div class="absolute inset-0 z-0 bg-black/50"></div>
    
    <div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <Newspaper size={13} class="text-brand-green" />
          {badgeText}
        </div>
        <h1 class="font-display mb-3 text-4xl font-800 text-white drop-shadow-lg sm:text-5xl">
          {title}
        </h1>
        <p class="mb-8 text-lg text-white/90 drop-shadow-md">
          {subtitle}
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

  <!-- Articles List -->
  <div class="articles-section mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
    {#if allResults.length === 0}
      <div in:fade={{ duration: 200 }} class="py-20 text-center text-slate-400">
        <Newspaper size={40} class="mx-auto mb-4 opacity-40" />
        <p>{m.news_none_found()}</p>
      </div>
    {:else}
      <!-- Results count info -->
      <div class="mb-6 text-sm text-slate-500">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, allResults.length)} of {allResults.length} articles
      </div>
      
      <div class="space-y-6">
        {#each paginatedResults as article, i (article.slug)}
          <a
            in:fly={{ y: 15, duration: 350, delay: i * 60 }}
            href={getHref(article.slug)}
            class="card-hover group flex flex-col overflow-hidden rounded-2xl border border-2 border-slate-400 dark:bg-gray-800 bg-white shadow-sm transition-all sm:flex-row"
          >
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
      
      <!-- Pagination Component -->
      {#if totalPages > 1}
        <div class="mt-12 flex items-center justify-center gap-2">
          <!-- Previous button -->
          <button
            onclick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <ChevronLeft size={18} />
          </button>
          
          <!-- Page numbers -->
          {#each getPageNumbers() as page}
            {#if page === '...'}
              <span class="flex h-10 w-10 items-center justify-center text-slate-400">...</span>
            {:else}
              <button
                onclick={() => goToPage(page as number)}
                class="flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg px-3 transition-all {currentPage === page
                  ? 'bg-brand-green text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green'
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
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        <!-- Items per page selector (optional) -->
        <div class="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          <span>Show:</span>
          <select
            bind:value={itemsPerPage}
            onchange={() => currentPage = 1}
            class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
          <span>per page</span>
        </div>
      {/if}
    {/if}
  </div>
</div>