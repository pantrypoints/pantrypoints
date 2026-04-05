<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import {
    Eye, Sprout, Users, Handshake, GraduationCap, Landmark, 
    ShieldCheck, Target, Globe, Leaf, TrendingUp,
    Scale, Lightbulb, Heart
  } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // Handle Locales
  let locale = $derived((data.locale ?? 'en') as 'en' | 'tl' | 'cb');

  const content = {
    en: {
      hero_badge: "About UNLADSAKA",
      hero_title_1: "Empowering Filipino Farmers,",
      hero_title_2: "Growing Together",
      hero_desc: "UNLADSAKA is a unified association of farmers and landowners committed to transforming Philippine agriculture through collective action, shared knowledge, and sustainable practices.",
      purpose_badge: "Our Purpose",
      purpose_title: "Why We Exist",
      purpose_desc: "The purpose of UNLADSAKA Association of Farmers and Land Owners is to empower members by increasing access to resources, capital, technology, and information...",
      mission_title: "Our Mission",
      mission_text: "To empower Filipino farmers and landowners by increasing access to resources, capital, technology, and information, while facilitating collective marketing and purchasing to increase income and efficiency.",
      vision_title: "Our Vision",
      vision_text: "A thriving agricultural sector where Filipino farmers are prosperous, empowered, and united, contributing to food security and sustainable rural development.",
      functions_badge: "Core Functions",
      functions_title: "Key Purposes & Functions",
      functions_desc: "How we serve and empower our farming community",
      f1_t: "Economic Empowerment", f1_d: "Reduce input costs through bulk purchasing of seeds and fertilizer. Increase profits through collective marketing.",
      f2_t: "Knowledge & Technology", f2_d: "Facilitate training, workshops, and adoption of modern farming technologies and sustainable practices.",
      f3_t: "Financial Services", f3_d: "Connect farmers with credit, loans, and financial services to support small-scale operations.",
      f4_t: "Policy Advocacy", f4_d: "Represent farmers' voices at local and national levels for better agricultural policies.",
      f5_t: "Networking & Support", f5_d: "Offer platforms for farmers to share experiences, build trust, and collaborate as a united group.",
      f6_t: "Risk Management", f6_d: "Help farmers handle market fluctuations, crop diseases, and natural disasters through collaboration."
    },
    tl: { /* Add Tagalog translations here */ },
    cb: { /* Add Cebuano translations here */ }
  };

  // Helper function for translations
  function t(key: keyof typeof content['en']) {
    return content[locale][key] || content['en'][key];
  }

  // Animation States
  let visible = $state(false);
  let statsVisible = $state(false);
  let statsRef: HTMLElement | undefined;

  onMount(() => {
    setTimeout(() => (visible = true), 80);
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        statsVisible = true;
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (statsRef) obs.observe(statsRef);
    return () => obs.disconnect();
  });

  // Icons are mapped separately to keep the content object clean
  const functions = $derived([
    { icon: Handshake, title: t('f1_t'), description: t('f1_d'), color: "from-amber-500 to-orange-500" },
    { icon: GraduationCap, title: t('f2_t'), description: t('f2_d'), color: "from-emerald-500 to-teal-500" },
    { icon: Landmark, title: t('f3_t'), description: t('f3_d'), color: "from-blue-500 to-cyan-500" },
    { icon: Scale, title: t('f4_t'), description: t('f4_d'), color: "from-purple-500 to-violet-500" },
    { icon: Heart, title: t('f5_t'), description: t('f5_d'), color: "from-rose-500 to-pink-500" },
    { icon: ShieldCheck, title: t('f6_t'), description: t('f6_d'), color: "from-amber-600 to-orange-600" }
  ]);
</script>




<div class="page-transition min-h-screen bg-slate-50/50">
	<header class="relative overflow-hidden border-b border-slate-100">
		<video autoplay muted loop playsinline class="absolute inset-0 h-full w-full object-cover">
			<source src="/app.mp4" type="video/mp4" />
		</video>
		<div class="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]"></div>
		
		<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl">
				<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
					<Globe size={13} class="text-brand-green" />
					{m.about_badge()}
				</div>
				<h1 class="mb-3 text-4xl font-800 text-white sm:text-5xl drop-shadow-lg">
					{m.about_title()}
				</h1>
				<p class="text-lg text-white/90">
					{m.about_subtitle()}
				</p>
			</div>
		</div>
	</header>

	<nav class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
		<div class="mx-auto max-w-6xl px-4">
			<div class="flex flex-nowrap items-center justify-start gap-1 overflow-x-auto py-3 no-scrollbar sm:justify-center">
				{#each tabs as tab}
					{#if tab.type === 'internal'}
						<button
							onclick={() => activeTab = tab.id}
							class="flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all
							{activeTab === tab.id 
								? 'bg-brand-green text-white shadow-md' 
								: 'text-slate-600 hover:bg-slate-100'}"
						>
							<tab.icon size={16} />
							{getLabel(tab)}
						</button>
					{:else}
						<a href={tab.href}
							target={tab.external ? '_blank' : '_self'}
							rel={tab.external ? 'noopener noreferrer' : undefined}
							class="flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
						>
							<tab.icon size={16} />
							{getLabel(tab)}
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
		{#if activeTab === 'about'}
			<div in:fade={{ duration: 200 }} class="prose prose-slate prose-green max-w-none">
				<h2>{m.about_heading()}</h2>
				<p class="text-lg leading-relaxed">
					{m.about_description()} <a href='https://www.superphysics.org/social/economics/' target="_blank">Economic Superphysics</a>
				</p>
				
				<h3>{m.about_mission_heading()}</h3>
				<p>{m.about_mission_text()}</p>
				
				<h3>{m.about_vision_heading()}</h3>
				<p>{m.about_vision_text()}</p>
				
				<h3>{m.about_values_heading()}</h3>
				<ul>
					<li><strong>{m.about_value_1_title()}:</strong> {m.about_value_1_desc()}</li>
					<li><strong>{m.about_value_2_title()}:</strong> {m.about_value_2_desc()}</li>
					<li><strong>{m.about_value_3_title()}:</strong> {m.about_value_3_desc()}</li>
					<li><strong>{m.about_value_4_title()}:</strong> {m.about_value_4_desc()}</li>
				</ul>
			</div>

		{:else if activeTab === 'team'}
			<div in:fly={{ y: 20, duration: 300 }}>
				<h2 class="mb-8 text-2xl font-700 text-slate-900">{m.team_heading()}</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each teamMembers as member}
						<div class="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg">
							<div class="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
								{#if member.image}
									<img src={member.image} alt={member.name} class="h-full w-full object-cover" />
								{/if}
							</div>
							<h3 class="text-lg font-bold text-slate-900">{member.name}</h3>
							<p class="text-sm text-brand-green">
								{member.role[languageTag()] || member.role.en}
							</p>
						</div>
					{/each}
				</div>
			</div>

		{:else if activeTab === 'partners'}
			<div in:fade>
				<h2 class="mb-8 text-2xl font-700 text-slate-900">{m.partners_heading()}</h2>

				<div class="grid gap-4 sm:grid-cols-2">
					{#each partners as partner}

						{@const sectorText = getSectorText(partner)}
								
<!-- Case 1: No image - show teal bg with name centered -->
{#if !partner.image}
	{#if partner.url}
		<a 
			href={partner.url}
			target="_blank"
			rel="noopener noreferrer"
			class="relative flex items-center justify-center rounded-xl bg-teal-600 p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] hover:bg-teal-700 aspect-video group"
		>
			<!-- Sector badge -->
			<div class="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
				{sectorText}
			</div>
			<div class="text-center">
				<h4 class="text-xl font-bold text-white group-hover:underline">{partner.name}</h4>
			</div>
		</a>
	{:else}
		<div class="relative flex items-center justify-center rounded-xl bg-teal-600 p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02] hover:bg-teal-700 aspect-video group">
			<!-- Sector badge -->
			<div class="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
				{sectorText}
			</div>
			<div class="text-center">
				<h4 class="text-xl font-bold text-white group-hover:underline">{partner.name}</h4>
			</div>
		</div>
	{/if}

<!-- Case 2: Has image and showname is false - show full image only -->
{:else if partner.image && !partner.showname}
	{#if partner.url}
		<a 
			href={partner.url}
			target="_blank"
			rel="noopener noreferrer"
			class="relative block overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02] group"
		>
			<!-- Sector badge -->
			<div class="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
				{sectorText}
			</div>
			<img src={partner.image} alt={partner.name} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" />
		</a>
	{:else}
		<div class="relative block overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02] group">
			<!-- Sector badge -->
			<div class="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
				{sectorText}
			</div>
			<img src={partner.image} alt={partner.name} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" />
		</div>
	{/if}

	<!-- Case 3: Has image and showname is true - show image with overlay -->
	{:else if partner.image && partner.showname}
		{#if partner.url}
			<a 
				href={partner.url}
				target="_blank"
				rel="noopener noreferrer"
				class="relative block overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02] group"
			>
				<!-- Sector badge (higher z-index to appear above overlay) -->
				<div class="absolute left-3 top-3 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
					{sectorText}
				</div>
				<img src={partner.image} alt={partner.name} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<div class="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60"></div>
				<div class="absolute inset-0 flex items-center justify-center p-6">
					<div class="text-center">
						<h4 class="text-4xl font-bold text-white group-hover:underline">{partner.name}</h4>
					</div>
				</div>
			</a>
		{:else}
			<div class="relative block overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02] group">
				<!-- Sector badge (higher z-index to appear above overlay) -->
				<div class="absolute left-3 top-3 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm group-hover:bg-black/70">
					{sectorText}
				</div>
				<img src={partner.image} alt={partner.name} class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105" />
				<div class="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/60"></div>
				<div class="absolute inset-0 flex items-center justify-center p-6">
					<div class="text-center">
						<h4 class="text-4xl font-bold text-white group-hover:underline">{partner.name}</h4>
					</div>
				</div>
			</div>
		{/if}
	{/if}

					{/each}
				</div>


			</div>
		{/if}
	</main>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar { display: none; }
	.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
