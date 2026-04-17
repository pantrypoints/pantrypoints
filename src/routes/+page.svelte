<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade, scale } from 'svelte/transition';
	import { BanknoteX, CircleDollarSign, ArrowRight, CheckCircle, Zap, Users, Leaf, Globe, Shield, TrendingUp } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';
	import Scroll from '$lib/components/Scroll.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Locations from '$lib/components/Locations.svelte';
	import { cubicOut } from 'svelte/easing';
	import AwardsTicker from '$lib/components/Awards.svelte';

  	import { languageTag } from '$lib/paraglide/runtime';


	let { data, form } = $props();

	  // Force reactivity — re-evaluates all messages when lang changes
	  let lang = $derived(data.lang);


	let submitting = $state(false);
	let submitted = $state(form?.success ?? false);

	  let heroTitle     = $derived((lang, m.hero_title()));
	  let heroAccent    = $derived((lang, m.hero_title_accent()));
	  let heroBadge     = $derived((lang, m.hero_badge()));
	  let heroSubtitle  = $derived((lang, m.hero_subtitle()));
	  let navTagline    = $derived((lang, m.nav_tagline()));

	const mySteps = [
		{ 
			id: 1, 
			img: "/screens/po1.jpg", 
			title: "Step 1: Post your item", 
			sub: "Post your item using a points price instead of a money price" 
		},
		{ 
			id: 2, 
			img: "/graphics/meetup.jpg", 
			title: "Step 2: Meetup", 
			sub: "Meet up with the buyers of your item" 
		},
		{ 
			id: 3, 
			img: "/screens/pay.jpg", 
			title: "Step 3: Give your item", 
			sub: "Give your item and record the debt using the cards or the app" 
		}
	];

	const features = [
		{ icon: BanknoteX,  color: '#3c95d3', titleFn: () => m.feat_points_title(),    descFn: () => m.feat_points_desc()    },
		{ icon: CircleDollarSign,  color: '#00BD6C', titleFn: () => m.feat_community_title(), descFn: () => m.feat_community_desc() },
		{ icon: Globe, color: '#FFA500', titleFn: () => m.feat_global_title(),    descFn: () => m.feat_global_desc()    },
	];

	const stats = [
		{ value: '50K+', labelFn: () => m.stat_members() },
		{ value: '200+', labelFn: () => m.stat_networks() },
		{ value: '1M+',  labelFn: () => m.stat_points()   },
		{ value: '30+',  labelFn: () => m.stat_countries() }
	];

	const steps = [
		{ step: '01', color: '#3c95d3', titleFn: () => m.step_join_title(),     descFn: () => m.step_join_desc()     },
		{ step: '02', color: '#00BD6C', titleFn: () => m.step_offer_title(),    descFn: () => m.step_offer_desc()    },
		{ step: '03', color: '#FFA500', titleFn: () => m.step_exchange_title(), descFn: () => m.step_exchange_desc() }
	];


	const personas = [
		{ titleFn: () => m.persona_businessOwner(),    descFn: () => m.persona_businessOwnerDesc(),    avatar: '/icons/shop.jpg',     url: '/services/build/' },
		{ titleFn: () => m.persona_frequentShopper(),  descFn: () => m.persona_frequentShopperDesc(),  avatar: '/icons/shopper.jpg',  url: '/pantrypreneur/rewards/' },
		{ titleFn: () => m.persona_unemployed(),       descFn: () => m.persona_unemployedDesc(),       avatar: '/icons/bum.jpg',      url: 'https://circle.pantrypoints.com/' },
		{ titleFn: () => m.persona_teacher(),          descFn: () => m.persona_teacherDesc(),          avatar: '/icons/teacher.jpg',  url: '/pantrypreneur/educate' },
		{ titleFn: () => m.persona_healthConscious(),  descFn: () => m.persona_healthConsciousDesc(),  avatar: '/icons/yoga.jpg',     url: '/pantrypreneur/health/' },
		{ titleFn: () => m.persona_investor(),         descFn: () => m.persona_investorDesc(),         avatar: '/icons/investor.jpg', url: '/trisactions/invesure/' },
		{ titleFn: () => m.persona_banker(),           descFn: () => m.persona_bankerDesc(),           avatar: '/icons/banker.jpg',   url: '/trisactions/banking' },
		{ titleFn: () => m.persona_farmer(),           descFn: () => m.persona_farmerDesc(),           avatar: '/icons/farmer.jpg',   url: '/pantrypreneur/farm/' },
		{ titleFn: () => m.persona_government(),       descFn: () => m.persona_governmentDesc(),       avatar: '/icons/gov.jpg',      url: '/services/tax' },
	];


	function getErrorMessage(error: string | undefined): string {
		if (!error) return '';
		const map: Record<string, () => string> = {
			email_exists: m.err_email_exists,
			email_invalid: m.err_email_invalid,
			name_required: m.err_name_required,
			server_error: m.err_server_error
		};
		return (map[error] ?? (() => error))();
	}



	const awardsData = [
		{
			id: '150',
			icon: '/icons/hatch.jpg',
			title: 'Top 10, 2015',
			subtitle: 'Hack for Social Good',
			url: '/news/15-10-24'
		},		
		{
			id: '162',
			icon: '/icons/magic.jpg',
			title: 'Top 20, 2016',
			subtitle: 'ASEANs Next Great Idea',
			url: '/news/16-12-09'
		},
		{
			id: '172',
			icon: '/icons/slush.jpg',
			title: 'Semifinalist, 2017',
			subtitle: 'Slush Global Impact Accelerator Vietnam',
			url: '/news/17-10-28'
		},
		{
			id: '177',
			icon: '/icons/blockathon.jpg',
			title: '2nd Place, 2017',
			subtitle: 'Vietnam Blockathon',
			url: '/news/17-11-26'
		},
		{
			id: '180',
			icon: '/icons/nasa.jpg',
			title: 'Most Inspiring, 2018',
			subtitle: 'NASA Hackathon',
			url: '/news/18-10-21'
		},		
		{
			id: '181',
			icon: '/icons/techfest.jpg',
			title: 'Top 10, 2018',
			subtitle: 'Aboitiz Decode Hackathon',
			url: '/news/18-11-10'
		},
		{
			id: '188',
			icon: '/icons/blockdevs.jpg',
			title: 'Special Prize, 2018',
			subtitle: 'DISH Hackathon Manila',
			url: '/news/18-11-24'
		},		
		{
			id: '196',
			icon: '/icons/impact.jpg',
			title: 'Top 10, 2019',
			subtitle: 'Impacthub Hackathon',
			url: '/news/19-10-31'
		},
		{
			id: '192',
			icon: '/icons/wv2.jpg',
			subtitle: 'Social Innovation Challenge, World Vision Philippines',
			title: '2nd Place, 2019',
			url: '/news/19-08-14'
		},
		{
			id: '201',
			icon: '/icons/hackdays.jpg',
			title: 'Top 5, 2020',
			subtitle: 'AWS Hackdays',
			url: '/news/20-07-23'
		},
		{
			id: '200',
			icon: '/icons/ninja.jpg',
			title: 'Participant, 2020',
			subtitle: 'Project NINJA by JICA',
			url: '/news/20-12-10'
		},					
		{
			id: '216',
			icon: '/icons/habitat.jpg',
			title: 'Preliminary Round, 2021',
			subtitle: 'Plastics Hackathon by UN Habitat',
			url: '/news/21-06-05'
		},		
		{
			id: '230',
			icon: '/icons/searca.jpg',
			title: 'Top 40, 2023',
			subtitle: 'SEARCA FLExPHD Planetary Health Diet',
			url: '/news/23-04-28'
		},
		{
			id: '233',
			icon: '/icons/fish.jpg',
			title: 'Finalist, 2023',
			subtitle: 'Fishackathon',
			url: '/news/20-07-23'
		},		
		{
			id: '240',
			icon: '/icons/rotary.jpg',
			title: 'Participant, 2024',
			subtitle: 'Hatch Project by Rotary Club',
			url: '/news/24-08-10'
		},
		{
			id: '241',
			icon: '/icons/caiec.jpg',
			title: 'Participant, 2024',
			subtitle: 'CAIEC China-ASEAN Innovation',
			url: '/news/24-03-12'
		},	

	];
</script>




<svelte:head>
	<title>Pantrypoints — {m.nav_tagline()}</title>
	<meta name="description" content={m.hero_subtitle()} />
</svelte:head>




<!-- ══════════════════════════════════════════════
     HERO
══════════════════════════════════════════════ -->
<section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
	<video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover" >
		<source src="/vid.mp4" type="video/mp4">
	</video>
	
	<!-- Dark overlay for better text readability -->
	<div class="absolute inset-0 bg-black/40 z-0"></div>

	<div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

			<div in:fly={{ y: 30, duration: 600, delay: 100, easing: cubicOut }}>
				<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-display font-700 uppercase tracking-widest mb-8 border border-white/30">
					<Leaf size={12} />
					{m.hero_badge()}
				</span>
			</div>

			<div in:fly={{ y: 30, duration: 600, delay: 200, easing: cubicOut }}>
				<h1 class="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-white mb-6">
					{m.hero_title()}
					<br />
					<span class="relative">
						<span class="gradient-text">{m.hero_title_accent()}</span>
						<!-- Underline decoration - adjusted color for visibility -->
						<svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M4 12C50 4 150 2 200 8C250 14 350 4 396 8" stroke="white" stroke-width="6" stroke-linecap="round" stroke-opacity="0.5"/>
						</svg>
					</span>
				</h1>
			</div>

			<div in:fly={{ y: 30, duration: 600, delay: 300, easing: cubicOut }}>
				<p class="text-lg text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
					{m.hero_subtitle()}
				</p>
			</div>

		<div in:fly={{ y: 20, duration: 500, delay: 350 }} class="flex flex-wrap justify-center gap-3">
			<a
				href="/trisactions"
				class="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all hover:gap-3"
				style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)"
			>
				{m.hero_cta()} <ArrowRight size={16} />
			</a>
			<a
				href="#register"
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-brand-blue hover:text-brand-blue"
			>
				{m.hero_learn_more()}
			</a>
		</div>

			

		<!-- Scroll Down Button -->
		<Scroll t="quote" />
	</div>
</section>




<section id="quote" class="relative py-20 px-4 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-4xl mx-auto text-center">
			<div transition:fade={{ duration: 1000 }}>
				<!-- Quote -->
				<blockquote class="mb-8">
					<p class="text-2xl md:text-3xl font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
						{m.quote1()}
					</p>
				</blockquote>
				
				<!-- Author -->
				<div class="flex items-center justify-center gap-4 mb-12">
					<div class="w-12 h-12 rounded-full bg-gradient-to-br from-pastel-blue to-pastel-green flex items-center justify-center text-white font-bold">
						<img src="/icons/Adam Smith.jpg" alt="Adam Smith">
					</div>
					<div class="text-left">
						<p class="font-bold text-gray-900 dark:text-white">{m.adam()}</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">{m.wn()}, 1776</p>
					</div>
				</div>
			</div>
	</div>
</section>


<!-- WHAT
══════════════════════════════════════════════ -->
<section class="py-24 bg-white dark:bg-gray-950 relative flex flex-col justify-between">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
		<div class="mb-14 text-center">
			<h2 class="font-display mb-3 text-4xl font-700 dark:text-white text-slate-900">{m.what()}</h2>
			<p class="text-lg dark:text-slate-200 text-slate-700">{m.ppis()}</p>
		</div>

		<!-- YouTube Video -->
		<div class="flex justify-center mb-16">
			<div class="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
				<iframe 
					width="100%" 
					height="100%" 
					src="https://www.youtube.com/embed/cnfpiAfNEK8?autoplay=1&mute=1&loop=1&playlist=cnfpiAfNEK8&si=MQEyQOVSgC-E1E2D&controls=1&modestbranding=1&rel=0" 
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
					referrerpolicy="strict-origin-when-cross-origin" 
					allowfullscreen
					class="absolute top-0 left-0 w-full h-full"
				></iframe>
			</div>
		</div>


		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each features as feat, i}
				
				<div
					in:fly={{ y: 20, duration: 400, delay: 100 + i * 80, easing: cubicOut }}
					class="p-6 text-center rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300">
					
					<!-- Fixed: Apply color as style, not class -->
					<div 
						class="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 text-white"
						style="background-color:{feat.color}">
						<svelte:component this={feat.icon} size={22} />
					</div>

					<h3 class="font-display font-800 text-xl text-gray-900 dark:text-white mb-2">
						{feat.titleFn()}
					</h3>

					<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						{feat.descFn()}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>


<AwardsTicker 
	awards={awardsData} 
	title="Our Awards & Rankings"
/>




<!-- How it works -->
<section class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-14 text-center">
			<h2 class="font-display mb-3 text-4xl font-700 text-slate-900">{m.home_how_title()}</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-3">
			{#each steps as step, i}
				<div in:fly={{ y: 25, duration: 500, delay: i * 120 }}>
					<div
						class="font-display mb-3 text-5xl font-800"
						style="color: {step.color}22; letter-spacing: -0.02em">
						Step {step.step}
					</div>
					<h3 class="font-display mb-2 text-lg font-600 text-slate-900">{step.titleFn()}</h3>
					<p class="text-sm leading-relaxed text-slate-500">{step.descFn()}</p>
				</div>
			{/each}
		</div>
		<Carousel steps={mySteps} textPosition="top"/>
	</div>
</section>



<section class="py-24 bg-gray-50 dark:bg-gray-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">	

		<div class="mb-14 text-center">
			<h2 class="font-display mb-3 text-4xl font-700 dark:text-white text-slate-900">{m.which()}</h2>
			<p class="text-lg text-slate-500">{m.ppisfor()}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-10">
			{#each personas as persona, i}
				<a 
					href={persona.url}
					target={persona.url.startsWith('http') ? '_blank' : '_self'}
					rel={persona.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
					in:fly={{ y: 30, delay: i * 150 }}>
					<div class="relative w-24 h-24 mb-8">
						<div class="absolute inset-0 bg-gradient-to-tr from-pastel-blue-light to-pastel-purple-light dark:from-pastel-blue-dark dark:to-pastel-purple-dark rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
						<img 
							src={persona.avatar} 
							alt="Persona" 
							class="relative w-full h-full rounded-3xl object-cover bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm"
						/>
					</div>

			        <h3 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-4">
			            {persona.titleFn()}
			        </h3>
			        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xs">
			            {persona.descFn()}
			        </p>
				</a>
			{/each}
		</div>
	</div>
</section>




<!-- Stats -->
<!-- <section class="border-y border-slate-100 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mx-auto grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
		{#each stats as stat, i}
			<div in:fly={{ y: 20, duration: 500, delay: i * 80 }} class="text-center">
				<div class="font-display mb-1 text-3xl font-800 text-brand-blue">{stat.value}</div>
				<div class="text-sm text-slate-500">{stat.labelFn()}</div>
			</div>
		{/each}
	</div>
</section> -->



<!-- CTA strip -->
<section class="px-4 py-16 sm:px-6 lg:px-8" style="background: linear-gradient(135deg, #3c95d3, #00BD6C)">
	<div class="mx-auto max-w-3xl text-center text-white">
	<div class="max-w-3xl mb-12 mx-auto px-4 text-center">
		<h2 class="font-display font-900 text-4xl sm:text-5xl mb-5 text-white">
			{m.current_locations()}
		</h2>
		<p class="text-white/80 text-lg text-base max-w-xl mx-auto leading-relaxed">
			{m.deployed()}
		</p>
	<Locations />
	</div>
	


	<div id="register" class="max-w-3xl mx-auto px-4 text-center">
		<h2 class="font-display font-900 text-4xl sm:text-5xl mb-5 text-white">
			{m.ready()}
		</h2>
		<p class="text-white/80 text-lg text-base mb-10 max-w-xl mx-auto leading-relaxed">
			{m.registerfor()}
		</p>

		{#if submitted || form?.success}
			<div
				in:scale={{ start: 0.95, duration: 400 }}
				class="rounded-2xl border border-green-100 bg-green-50 p-10 text-center">
				<CheckCircle size={48} class="mx-auto mb-4 text-brand-green" />
				<h3 class="font-display mb-2 text-xl font-700 text-slate-900">{m.register_success_title()}</h3>
				<p class="text-slate-600">{m.register_success_msg()}</p>
			</div>
		{:else}
		<!-- action="https://usebasin.com/f/fe409f5e1e78"  -->
		
			<form method="POST"  
				action="?/register" use:enhance={() => {submitting = true; return async ({ result, update }) => {submitting = false; if (result.type === 'success') submitted = true; await update(); }; }}
				class="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm" target="_blank">
				{#if form?.error}
					<div
						in:fly={{ y: -8, duration: 200 }}
						class="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
						{getErrorMessage(form.error)}
					</div>
				{/if}

				<input id="source" name="source" type="hidden" value="PP website root" />


				<div class="grid gap-4 sm:grid-cols-2 text-left">
					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="name">
							{m.register_name_label()} <span class="text-brand-red">*</span>
						</label>
						<input
							id="name" name="name" type="text" required
							placeholder={m.register_name_placeholder()}
							value={form?.name ?? ''}
							class="w-full text-gray-900 rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"/>
					</div>

					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="email">
							{m.register_email_label()} <span class="text-brand-red">*</span>
						</label>				
						<input id="email" name="email" type="email" required placeholder={m.register_email_placeholder()} value={form?.email ?? ''} class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none" />
					</div>


					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="gender">
							{m.gender()} <span class="text-brand-red">*</span>
						</label>
						<div class="relative">
							<select
								id="gender" 
								name="gender"
								class="w-full rounded-xl text-gray-900 border border-slate-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
								required>
								<option value="" disabled selected>Select</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
							
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</div>
					</div>

					<div class="text-left">
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="organization">
							{m.age()} <span class="text-brand-red">*</span>
						</label>
						<input
							id="age" name="age" type="number" required
							placeholder="21"
							value={form?.age ?? ''}
							class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-gray-900 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none" />
					</div>

					<div>
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="gender">
							{m.preflang()}
						</label>
						<input
							id="lang" name="lang" type="text" 
							placeholder="English"
							value={form?.lang ?? ''}
							class="w-full text-gray-900 rounded-xl border border-slate-200 px-4 py-2.5 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
						/>
					</div>

					<div class="text-left">
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="organization">
							{m.country()}
						</label>
						<input
							id="country" name="country" type="text"
							placeholder="USA"
							value={form?.country ?? ''}
							class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
						/>
					</div>

					<div class="text-left">
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="organization">
							{m.city()}
						</label>
						<input
							id="city" name="city" type="text"
							placeholder="New York"
							value={form?.city ?? ''}
							class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-gray-900 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"/>
					</div>

					<div class="text-left">
						<label class="mb-1.5 block text-sm font-medium text-slate-700" for="organization">
							{m.phone()}
						</label>
						<input
							id="phone" name="phone" type="text"
							placeholder="+84 1234 567 890"
							value={form?.phone ?? ''}
							class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-gray-900 text-sm transition-colors focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"/>
					</div>					
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
					style="background: linear-gradient(135deg, #3c95d3, #2a7ab8)">
					{#if submitting}
						<span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
					{/if}
					{submitting ? m.register_submitting() : m.register_submit()}
				</button>
			</form>
		{/if}
	</div>
	</div>
</section>

