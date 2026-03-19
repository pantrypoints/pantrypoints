<script lang="ts">
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import { Menu, X, Globe, Sun, Moon } from 'lucide-svelte';
  import { languageTag } from '$lib/paraglide/runtime';
  import * as m from '$lib/paraglide/messages';
  import { theme } from '$lib/stores/theme';

  let { lang }: { lang: 'en' | 'zh' | 'es' | 'fr' | 'vi' } = $props();

  let mobileOpen = $state(false);
  let langOpen = $state(false);
  let isDark = $derived($theme === 'dark');

  const navLinks = [
    { href: '/',              labelFn: () => m.nav_home()  },
    { href: '/trisactions',   labelFn: () => m.nav_apps()  },
    { href: '/pantrypreneur', labelFn: () => m.nav_preneur() },
    { href: '/services',      labelFn: () => m.services() },
    { href: '/news',          labelFn: () => m.nav_news()  },
    { href: '/docs',          labelFn: () => m.nav_docs()  },
    { href: '/about',         labelFn: () => m.about()  }
  ];

  // Map of language codes to display text and flags
  const languages = {
    en: { flag: '🇬🇧', label: () => 'English', display: 'EN' },
    zh: { flag: '🇨🇳', label: () => '中文', display: '中文' },
    es: { flag: '🇪🇸', label: () => 'Spanish', display: 'ES' },
    fr: { flag: '🇫🇷', label: () => 'French', display: 'FR' },
    vi: { flag: '🇻🇳', label: () => 'Tieng Viet', display: 'VI' }
  } as const;

  function isActive(href: string) {
    const pathname = $page.url.pathname;
    // Strip any leading lang prefix before comparing
    const bare = pathname.replace(/^\/(en|zh|es|fr|vi)(?=\/|$)/, '') || '/';
    if (href === '/') return bare === '/';
    return bare.startsWith(href);
  }

  async function setLang(newLang: 'en' | 'zh' | 'es' | 'fr' | 'vi') {
    // Set cookie directly on client so it's guaranteed available before reload
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;

    // Also notify server (fire and forget)
    fetch('/api/lang', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: newLang }),
    });

    langOpen = false;
    window.location.reload();
  }

  // Get current language display
  const currentLang = $derived(languages[lang] || languages.en);
</script>

<nav class="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">

      <!-- Logo -->
      <a 
        href={'/'} 
        class="flex items-center gap-2 font-display text-lg font-700 text-slate-900 dark:text-white"
      >
        <img src="/icons/pantry50.png" alt="Pantrypoints icon" class="h-8 w-auto">
        <span>Pantrypoints</span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden items-center gap-1 md:flex">
        {#each navLinks as link}
          <a
            href={link.href}
            class="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors
              {isActive(link.href)
                ? 'text-brand-blue'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'}"
          >
            {link.labelFn()}
            {#if isActive(link.href)}
              <span class="absolute right-2 bottom-1 left-2 h-0.5 rounded-full bg-brand-blue"></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Right controls -->
      <div class="flex items-center gap-2">

        <!-- Dark mode toggle -->
        <button
          onclick={() => theme.toggle()}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors
            hover:border-brand-blue hover:text-brand-blue
            dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
        >
          {#if isDark}
            <Sun size={15} />
          {:else}
            <Moon size={15} />
          {/if}
        </button>

        <!-- Lang selector -->
        <div class="relative">
          <button
            onclick={() => (langOpen = !langOpen)}
            class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors
              hover:border-brand-blue hover:text-brand-blue
              dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
          >
            <Globe size={14} />
            <span>{currentLang.display}</span>
          </button>

          {#if langOpen}
            <div
              transition:fly={{ y: -8, duration: 150 }}
              class="absolute top-full right-0 mt-1.5 w-36 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              {#each Object.entries(languages) as [code, { flag, label }]}
                <button
                  onclick={() => setLang(code as 'en' | 'zh' | 'es' | 'fr' | 'vi')}
                  class="flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700
                    {lang === code ? 'font-semibold text-brand-blue' : 'text-slate-700 dark:text-slate-300'}"
                >
                  <span>{flag}</span> {label()}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Mobile hamburger -->
        <button
          onclick={() => (mobileOpen = !mobileOpen)}
          aria-label="Toggle mobile menu"
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors
            hover:border-brand-blue hover:text-brand-blue md:hidden
            dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
        >
          {#if mobileOpen}
            <X size={16} />
          {:else}
            <Menu size={16} />
          {/if}
        </button>

      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div
      transition:fly={{ y: -8, duration: 150 }}
      class="border-t border-slate-100 bg-white px-4 pb-4 dark:border-slate-800 dark:bg-slate-900 md:hidden"
    >
      {#each navLinks as link}
        <a
          href={link.href}
          onclick={() => (mobileOpen = false)}
          class="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
            {isActive(link.href)
              ? 'text-brand-blue'
              : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}"
        >
          {link.labelFn()}
        </a>
      {/each}
      <a
        href={'/admin'}
        onclick={() => (mobileOpen = false)}
        class="mt-1 flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors
          hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        {m.nav_admin()}
      </a>
    </div>
  {/if}
</nav>

<!-- Backdrop to close dropdowns -->
{#if langOpen}
  <button
    class="fixed inset-0 z-40"
    onclick={() => (langOpen = false)}
    aria-label="Close dropdown"
  ></button>
{/if}

