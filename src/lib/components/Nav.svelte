<script lang="ts">
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { Menu, X, Globe, Leaf, Sun, Moon } from 'lucide-svelte';
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { theme } from '$lib/stores/theme';

	let { lang }: { lang: 'en' | 'zh' } = $props();

	let mobileOpen = $state(false);
	let langOpen = $state(false);
	let isDark = $derived($theme === 'dark');

	const navLinks = [
		{ href: '/', labelFn: () => m.nav_home() },
		{ href: '/apps', labelFn: () => m.nav_apps() },
		{ href: '/news', labelFn: () => m.nav_news() }
	];

	function isActive(href: string) {
		const pathname = $page.url.pathname;
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	async function setLang(newLang: string) {
		await fetch('/api/lang', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ lang: newLang })
		});
		window.location.reload();
		langOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="group flex items-center gap-2.5">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-xl">
					<img src="/icons/pantry50.png">
					<!-- <Leaf size={18} class="text-white" /> -->
				</div>
				<div class="flex flex-col leading-none">
					<span class="font-display text-lg font-700 text-slate-900 dark:text-white">Pantrypoints</span>
					<span class="text-[10px] font-medium tracking-widest text-slate-400 uppercase dark:text-slate-500">
						{m.nav_tagline()}
					</span>
				</div>
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

				<a
					href="/admin"
					class="ml-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
				>
					{m.nav_admin()}
				</a>
			</div>

			<!-- Right controls -->
			<div class="flex items-center gap-2">
				<!-- Dark mode toggle -->
				<button
					onclick={() => theme.toggle()}
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
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
						class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-blue dark:hover:text-brand-blue"
					>
						<Globe size={14} />
						<span>{lang === 'zh' ? '中文' : 'EN'}</span>
					</button>

					{#if langOpen}
						<div
							transition:fly={{ y: -8, duration: 150 }}
							class="absolute top-full right-0 mt-1.5 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
						>
							<button
								onclick={() => setLang('en')}
								class="flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700
								{lang === 'en' ? 'font-semibold text-brand-blue' : 'text-slate-700 dark:text-slate-300'}"
							>
								<span>🇬🇧</span> {m.lang_en()}
							</button>
							<button
								onclick={() => setLang('zh')}
								class="flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700
								{lang === 'zh' ? 'font-semibold text-brand-blue' : 'text-slate-700 dark:text-slate-300'}"
							>
								<span>🇨🇳</span> {m.lang_zh()}
							</button>
						</div>
					{/if}
				</div>

				<!-- Mobile menu button -->
				<button
					onclick={() => (mobileOpen = !mobileOpen)}
					class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
					aria-label="Toggle menu"
				>
					{#if mobileOpen}<X size={20} />{:else}<Menu size={20} />{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div
			transition:fly={{ y: -10, duration: 200 }}
			class="border-t border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
					{isActive(link.href)
						? 'bg-blue-50 text-brand-blue dark:bg-blue-900/30'
						: 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}"
				>
					{link.labelFn()}
				</a>
			{/each}
			<a
				href="/admin"
				onclick={() => (mobileOpen = false)}
				class="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-500 dark:hover:bg-slate-800"
			>
				{m.nav_admin()}
			</a>
		</div>
	{/if}
</nav>

{#if langOpen}
	<button class="fixed inset-0 z-40" onclick={() => (langOpen = false)} aria-label="Close dropdown"></button>
{/if}
