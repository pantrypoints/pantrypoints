<script lang="ts">
	import { t } from '$lib/i18n';
	import { HelpCircle, Mail, ChevronDown } from 'lucide-svelte';

	let { data } = $props();
	let openSections = $state<Record<number, boolean>>({});

	function toggleSection(index: number) {
		openSections[index] = !openSections[index];
	}

	const sections = [
		{ titleKey: 'q1', contentKey: 'a1', video: 'ZLxiwg2-tUc' },
		{ titleKey: 'q2', contentKey: 'a2' },
		{ titleKey: 'q3', contentKey: 'a3' },
		{ titleKey: 'q4', contentKey: 'a4', subheadingKey: 'barter_credits' },
		{ titleKey: 'q5', contentKey: 'a5', video: 'hIKG2YpFoFQ' },
		{ titleKey: 'q6', contentKey: 'a6' },
		{ titleKey: 'q7', contentKey: 'a7', video: '25UmGDzactk' },
		{ titleKey: 'q8', contentKey: 'a8' },
		{ titleKey: 'q9', contentKey: 'a9' },
		{ titleKey: 'q10', contentKey: 'a10', subheadingKey: 'barter_credits' },
		{ titleKey: 'q11', contentKey: 'a11' },
		{ titleKey: 'q12', contentKey: 'a12' },
		{ titleKey: 'q13', contentKey: 'a13' },
		{ titleKey: 'q14', contentKey: 'a14', subheadingKey: 'pool_clearing' },
		{ titleKey: 'q15', contentKey: 'a15' },
		{ titleKey: 'q16', contentKey: 'a16' },
		{ titleKey: 'q17', contentKey: 'a17' },
		{ titleKey: 'q18', contentKey: 'a18', subheadingKey: 'try_it' },
		{ titleKey: 'q19', contentKey: 'a19' },
		{ titleKey: 'q20', contentKey: 'a20' }
	];
</script>

<svelte:head>
	<title>{t('faq_title')} | Pantrypoints</title>
	<meta name="description" content={t('faq_subtitle')} />
	<meta property="og:image" content="/og/pantrypoints.jpg" />
</svelte:head>

<div class="relative z-0 overflow-hidden border-b border-slate-100 bg-gradient-to-br from-brand-blue/90 to-brand-green/90">
	<!-- <div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: url('/graphics/pattern-grid.svg'); background-size: 30px 30px;"></div>
	</div> -->
	<div class="absolute inset-0 z-0 bg-black/40"></div>

	<div class="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
				<HelpCircle size={13} />
				{t('faq_badge')}
			</div>
			<h1 class="font-display mb-3 text-4xl font-800 text-white drop-shadow-lg sm:text-5xl">
				{t('faq_title')}
			</h1>
			<p class="mb-8 text-lg text-white/90 drop-shadow">
				{t('faq_subtitle')}
			</p>
		</div>
	</div>
</div>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="space-y-6">
		{#each sections as section, index}
			{#if section.subheadingKey}
				<div class="pb-2 pt-8">
					<h2 class="font-display border-b border-slate-200 pb-3 text-2xl font-700 text-slate-900">
						{t(section.subheadingKey)}
					</h2>
				</div>
			{/if}

			<div class="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
				<button 
					onclick={() => toggleSection(index)} 
					class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
				>
					<div class="flex items-start gap-4">
						<span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-medium text-brand-blue">
							{index + 1}
						</span>
						<span class="font-display font-600 text-slate-900">
							{t(section.titleKey)}
						</span>
					</div>
					<ChevronDown size={20} class="text-slate-400 transition-transform duration-300 {openSections[index] ? 'rotate-180' : ''}" />
				</button>

				{#if openSections[index]}
					<div class="animate-fadeIn border-t border-slate-100 bg-slate-50/50 px-6 py-5">
						<div class="prose prose-slate max-w-none">
							<div class="leading-relaxed text-slate-600">
								{@html t(section.contentKey)
									.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
									.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-blue hover:underline">$1</a>')}
							</div>

							{#if section.video}
								<div class="mt-6 aspect-video w-full overflow-hidden rounded-xl">
									<iframe 
										width="100%" height="100%" 
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
</div>

