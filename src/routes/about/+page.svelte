<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Info, Users, Handshake, ShieldCheck, FileText, Youtube, Zap, Globe } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime';

	// Local state for the "Internal" tabs
	let activeTab = $state('about');

	// Sample team data - replace with your actual team data
	const teamMembers = [
		{ name: 'Juan', role: { en: 'Founder', zh: '创始人' }, image: '/avatars/juan.jpg' },
		{ name: 'Anh', role: { en: 'Content', zh: 'Content' }, image: '/avatars/anh.jpg' },
		{ name: 'Jose', role: { en: 'Evangelist', zh: '社区经理' }, image: '/avatars/jing.jpg' },
		{ name: 'Ehmil', role: { en: 'Research Volunteer', zh: '' }, image: '/avatars/ehmil.jpg' },
		{ name: 'Adrian', role: { en: 'App Developer', zh: 'App Developer' }, image: '/avatars/adrian.jpg' }
	];

	// Sample partners data - replace with your actual partners
	const partners = [
		{ name: 'Partner Org 1', sector: { en: 'Logistics', zh: '物流' }, icon: Handshake },
		{ name: 'Partner Org 2', sector: { en: 'Technology', zh: '技术' }, icon: Handshake },
		{ name: 'Partner Org 3', sector: { en: 'Community Network', zh: '社区网络' }, icon: Users }
	];

	const tabs = [
		// Internal Content Tabs
		{ id: 'about', label: { en: 'About', zh: '关于' }, icon: Info, type: 'internal' },
		{ id: 'team', label: { en: 'Team', zh: '团队' }, icon: Users, type: 'internal' },
		{ id: 'partners', label: { en: 'Partners', zh: '合作伙伴' }, icon: Handshake, type: 'internal' },
		
		// External/Link Tabs
		{ 
			id: 'privacy', 
			label: { en: 'Privacy & Terms', zh: '隐私与条款' }, 
			icon: ShieldCheck, 
			type: 'link', 
			href: '/privacy' 
		},
		{ 
			id: 'youtube', 
			label: { en: 'YouTube', zh: 'YouTube' }, 
			icon: Youtube, 
			type: 'link', 
			href: 'https://youtube.com/@pantrypoints', 
			external: true 
		}
	];

	// Helper to get localized label
	function getLabel(tab: typeof tabs[0]): string {
		return tab.label[languageTag()] || tab.label.en;
	}
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
				<p class="text-lg leading-relaxed text-slate-600">
					{m.about_description()}
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
						<div class="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-brand-green">
								<partner.icon size={24} />
							</div>
							<div>
								<h4 class="font-bold text-slate-900">{partner.name}</h4>
								<p class="text-sm text-slate-500">
									{partner.sector[languageTag()] || partner.sector.en}
								</p>
							</div>
						</div>
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