<script lang="ts">
	import { page } from '$app/stores';
	import { HelpCircle, Mail, MessageCircle, ChevronDown } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import { languageTag } from '$lib/paraglide/runtime.js';
	
	let { data } = $props();
	let openSections = $state<Record<number, boolean>>({});
	
	function toggleSection(index: number) {
		openSections[index] = !openSections[index];
	}
	
	const sections = [
		{ title: m.q1(), content: m.a1(), video: 'ZLxiwg2-tUc' },
		{ title: m.q2(), content: m.a2() },
		{ title: m.q3(), content: m.a3() },
		{ 
			title: m.q4(), 
			content: m.a4(),
			subheading: m.barter_credits()
		},
		{ title: m.q5(), content: m.a5(), video: 'hIKG2YpFoFQ' },
		{ title: m.q6(), content: m.a6() },
		{ title: m.q7(), content: m.a7(), video: '25UmGDzactk' },
		{ title: m.q8(), content: m.a8() },
		{ title: m.q9(), content: m.a9() },
		{ 
			title: m.q10(), 
			content: m.a10(),
			subheading: m.barter_credits()
		},
		{ title: m.q11(), content: m.a11() },
		{ title: m.q12(), content: m.a12() },
		{ title: m.q13(), content: m.a13() },
		{ 
			title: m.q14(), 
			content: m.a14(),
			subheading: m.pool_clearing()
		},
		{ title: m.q15(), content: m.a15() },
		{ title: m.q16(), content: m.a16() },
		{ title: m.q17(), content: m.a17() },
		{ 
			title: m.q18(), 
			content: m.a18(),
			subheading: m.try_it()
		},
		{ title: m.q19(), content: m.a19() },
		{ title: m.q20(), content: m.a20() }
	];
</script>

<svelte:head>
	<title>{m.faq_title()} | Pantrypoints</title>
	<meta name="description" content={m.faq_subtitle()} />
	<meta property="og:image" content="/og/pantrypoints.jpg" />
</svelte:head>

<!-- Hero Section -->
<div class="relative border-b border-slate-100 overflow-hidden bg-gradient-to-br from-brand-blue/90 to-brand-green/90">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: url('/graphics/pattern-grid.svg'); background-size: 30px 30px;"></div>
	</div>
	
	<!-- Dark overlay for text readability -->
	<div class="absolute inset-0 bg-black/40 z-0"></div>
	
	<!-- Content -->
	<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
				<HelpCircle size={13} />
				{m.faq_badge()}
			</div>
			<h1 class="font-display mb-3 text-4xl font-800 text-white sm:text-5xl drop-shadow-lg">
				{m.faq_title()}
			</h1>
			<p class="mb-8 text-lg text-white/90 drop-shadow">
				{m.faq_subtitle()}
			</p>
		</div>
	</div>
</div>

<!-- FAQ Content -->
<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="space-y-6">
		{#each sections as section, index}
			{#if section.subheading}
				<div class="pt-8 pb-2">
					<h2 class="font-display text-2xl font-700 text-slate-900 border-b border-slate-200 pb-3">
						{section.subheading}
					</h2>
				</div>
			{/if}
			
			<div class="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
				<!-- Question -->
				<button
					onclick={() => toggleSection(index)}
					class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
				>
					<div class="flex items-start gap-4">
						<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-medium text-brand-blue">
							{index + 1}
						</span>
						<span class="font-display font-600 text-slate-900">
							{section.title}
						</span>
					</div>
					<ChevronDown 
						size={20} 
						class="text-slate-400 transition-transform duration-300 {openSections[index] ? 'rotate-180' : ''}"
					/>
				</button>
				
				<!-- Answer -->
				{#if openSections[index]}
					<div class="border-t border-slate-100 bg-slate-50/50 px-6 py-5 animate-fadeIn">
						<div class="prose prose-slate max-w-none">							
							<!-- Answer content with markdown-like formatting -->
							<div class="text-slate-600 leading-relaxed">
								{@html section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-blue hover:underline">$1</a>')}
							</div>
							
							<!-- YouTube Video -->
							{#if section.video}
								<div class="mt-6 aspect-video w-full overflow-hidden rounded-xl">
									<iframe
										width="100%"
										height="100%"
										src="https://www.youtube.com/embed/{section.video}"
										title="YouTube video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	
	<!-- Image Section -->
	<div class="mt-16 rounded-xl overflow-hidden border border-slate-100">
		<img 
			src="/graphics/versus.jpg" 
			alt="Grains versus Money" 
			class="w-full h-auto"
		/>
		<div class="bg-slate-50 px-6 py-3 text-center text-sm text-slate-500 border-t border-slate-100">
			Grains vs Money
		</div>
	</div>
	
	<!-- Contact CTA -->
	<div class="mt-16 text-center rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-green/5 p-10 border border-slate-100">
		<h2 class="font-display mb-2 text-2xl font-700 text-slate-900">{m.still_have_questions()}</h2>
		<p class="mb-6 text-slate-600">{m.well_be_happy_to_help()}</p>
		<a 
			href="/{languageTag()}/contact" 
			class="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-blue/90 hover:shadow-lg"
		>
			<Mail size={16} />
			{m.get_in_touch()}
		</a>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}
	.prose {
		color: #475569;
		line-height: 1.7;
	}
	.prose a {
		color: #3c95d3;
		text-decoration: none;
	}
	.prose a:hover {
		text-decoration: underline;
	}
	.prose strong {
		color: #0f172a;
		font-weight: 600;
	}
</style>

