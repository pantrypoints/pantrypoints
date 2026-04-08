<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { Search, ArrowRight, BookOpen } from 'lucide-svelte';
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime';

  // Page configuration
  let title = 'Pantrypoints Documentation';
  let subtitle = 'Guides, API references, and system models for the moneyless economy';
  let badgeLabel = 'Documentation Hub';
  let videoSrc = '/app.mp4';
  let basePath = '/docs';

  // Documentation modules
  const docsItems = [
    {
      slug: 'circle',
      name: 'Circle',
      nameZh: '圈子 (Circle)',
      description: 'How to use Pantrypoints Circle and make barter-credit transactions',
      descriptionZh: '如何使用 Pantrypoints Circle 并进行易货信用交易。',
      icon: '/icons/pantry50.png',
      status: 'live',
      tags: ['Community', 'Social']
    },
    {
      slug: 'educate',
      name: 'Educate',
      nameZh: '教育 (Educate)',
      description: 'How to use Pantrypreneur Educate to manage your class',
      descriptionZh: '如何使用 Pantrypoints Educate 管理您的班级。',
      icon: '/icons/educate.png',
      status: 'beta',
      tags: ['Learning', 'Science']
    },
    {
      slug: 'farm',
      name: 'Farm',
      nameZh: '农业 (Farm)',
      description: 'How to use Pantrypreneur Farm to manage your plots and crops',
      descriptionZh: '如何使用 Pantrypoints Farm 管理您的田地和作物。',
      icon: '/icons/farm.png',
      status: 'beta',
      tags: ['Agriculture', 'Food']
    },
    {
      slug: 'health',
      name: 'Health',
      nameZh: '健康 (Health)',
      description: 'How to use Pantrypreneur Health to stay healthy',
      descriptionZh: '如何使用 Pantrypreneur Health 保持健康。',
      icon: '/icons/health.png',
      status: 'beta',
      tags: ['Wellness', 'Medical']
    },
    {
      slug: 'match',
      name: 'Match',
      nameZh: '匹配 (Match)',
      description: 'How to use Pantrypoints Match to find a match.',
      descriptionZh: '如何使用 Pantrypoints Match 寻找合适的关系对象。',
      icon: '/icons/match.png',
      status: 'live',
      tags: ['Trade', 'Economy']
    },
    {
      slug: 'predict',
      name: 'Predict',
      nameZh: '预测 (Predict)',
      description: 'How to use Superphysics Predict to predict events in society',
      descriptionZh: '如何使用 Superphysics Predict 预测社会事件。',
      icon: '/icons/predict.png',
      status: 'beta',
      tags: ['Analytics', 'Forecasting']
    },
    {
      slug: 'preneur',
      name: 'Pantrypreneur',
      nameZh: 'Pantrypreneur',
      description: 'How to use Pantrypreneur for your business',
      descriptionZh: '如何使用 Pantrypreneur 经营您的业务。',
      icon: '/icons/p.png',
      status: 'live',
      tags: ['Business', 'Startups']
    },
    {
      slug: 'pantrylitics',
      name: 'Pantrylitics',
      nameZh: 'Pantrylitics',
      description: 'How to use Pantrylitics for your business',
      descriptionZh: '如何使用 Pantrylitics 经营您的业务。',
      icon: '/icons/pantrylitics.png',
      status: 'live',
      tags: ['Business', 'Startups']
    },    
    {
      slug: 'supereconomics',
      name: 'Supereconomics',
      nameZh: 'Supereconomics',
      description: 'How we use Supereconomics concepts in Pantrypoints',
      descriptionZh: '我们如何在 Pantrypoints 中运用 Supereconomics 的概念。',
      icon: '/icons/spsocial.png',
      status: 'coming-soon',
      tags: ['Macro', 'Global']
    },
    {
      slug: 'world',
      name: 'World',
      nameZh: '世界 (World)',
      description: 'How to use Pantrypoints World for cross border trade.',
      descriptionZh: 'antrypoints World – 跨境贸易使用指南',
      icon: '/icons/world.png',
      status: 'coming-soon',
      tags: ['Macro', 'Global']
    },
    {
      slug: 'galaxiv',
      name: 'Galaxiv',
      nameZh: 'Galaxiv',
      description: 'How to play Galaxiv',
      descriptionZh: '如何玩 Galaxiv 游戏。',
      icon: '/icons/galaxiv.png',
      status: 'live',
      tags: ['Business', 'Startups']
    },    
  ];

  let query = $state('');

  const results = $derived(
    docsItems.filter((item) => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.nameZh?.includes(q) ||
        item.descriptionZh?.includes(q) ||
        item.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    })
  );

  const statusColors: Record<string, string> = {
    live: '#00BD6C',
    beta: '#FFA500',
    'coming-soon': '#94a3b8'
  };

  // Fallbacks included in case some paraglide keys don't exist yet
  function statusLabel(status: string): string {
    try {
      if (status === 'live') return m.status_live();
      if (status === 'beta') return m.status_beta();
      return m.status_coming_soon();
    } catch {
      return status === 'coming-soon' ? 'Coming Soon' : status.charAt(0).toUpperCase() + status.slice(1);
    }
  }

  const getName = (item: any) => (languageTag() === 'zh' ? item.nameZh : item.name);
  const getDesc = (item: any) => (languageTag() === 'zh' ? item.descriptionZh : item.description);
</script>

<div class="page-transition">
  <div class="relative overflow-hidden border-b border-slate-100">
    {#if videoSrc}
      <video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div class="absolute inset-0 z-0 bg-black/50"></div>
    {:else}
      <div class="absolute inset-0 z-0 bg-slate-900"></div>
    {/if}

    <div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <BookOpen size={13} />
          {badgeLabel}
        </div>

        <h1 class="font-display mb-3 text-4xl font-800 text-white drop-shadow-lg sm:text-5xl">
          {title}
        </h1>
        
        <p class="mb-8 text-lg text-white/90 drop-shadow">
          {subtitle}
        </p>

        <div class="relative mx-auto max-w-md">
          <Search size={17} class="absolute top-1/2 left-4 -translate-y-1/2 text-white/70" />
          <input
            type="search"
            bind:value={query}
            placeholder={m.search()}
            class="w-full rounded-xl border border-white/30 bg-white/20 py-3 pl-11 pr-4 text-sm text-white placeholder-white/70 backdrop-blur-sm transition-colors focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
    {#if results.length === 0}
      <div in:fade={{ duration: 200 }} class="py-20 text-center text-slate-400">
        <Search size={40} class="mx-auto mb-4 opacity-40" />
        <p>{m.apps_none_found ? m.apps_none_found() : "No documentation found matching your search."}</p>
      </div>
    {:else}
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each results as item, i (item.slug)}
          <a
            in:fly={{ y: 20, duration: 350, delay: i * 60 }}
            href="{basePath}/{item.slug}"
            class="group block rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="mb-4 flex items-start justify-between">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 p-2 dark:bg-slate-800">
                <img src={item.icon} alt="" class="h-full w-full object-contain" />
              </div>
              <!-- <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style="background: {statusColors[item.status]}18; color: {statusColors[item.status]}"
              >
                {statusLabel(item.status)}
              </span> -->
            </div>

            <h3 class="font-display mb-1.5 text-xl font-bold transition-colors group-hover:text-brand-blue dark:text-white">
              {getName(item)}
            </h3>
            
            <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {getDesc(item)}
            </p>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>



<!-- <script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="docs"
  vid="/blog.mp4"
  title={m.docs_title()}
  subtitle={m.docs_sub()}
  badgeText={m.reference()}
/>


 -->