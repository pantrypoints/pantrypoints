<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { CircleQuestionMark, Info, Users, Handshake, ShieldCheck, FileText, Youtube, Zap, Globe } from 'lucide-svelte';
	import { t, getLocale } from '$lib/i18n';

	let activeTab = $state('about');

	const teamMembers = [
		{ name: 'Juan', role: { en: 'Founder', zh: '创始人' }, image: '/avatars/juan.jpg' },
		{ name: 'Jose', role: { en: 'Evangelist', zh: '社区经理' }, image: '/avatars/jing.jpg' },
		{ name: 'Anh', role: { en: 'Content', zh: 'Content' }, image: '/avatars/anh.jpg' },
		{ name: 'Ehmil', role: { en: 'Research Volunteer', zh: '' }, image: '/avatars/ehmil.jpg' },
		{ name: 'Adrian', role: { en: 'App Developer', zh: 'App Developer' }, image: '/avatars/adrian.jpg' }
	];

	interface Partner {
		name: string;
		sector: { en: string; zh: string };
		image?: string;
		showname?: boolean;
		url?: string;
	}

	const partners: Partner[] = [
		{ name: 'Angels Shelter', sector: { en: 'Charity', zh: '物流' }, image: '/graphics/angels.jpg', showname: false, url: 'https://angels.pantrypoints.com' },
		{ name: 'Ayus', sector: { en: 'Wellness', zh: '技术' }, image: '/graphics/ayus.jpg', showname: false, url: 'https://www.facebook.com/ayushealthshop/' },
		{ name: 'Capri Island Cafe', sector: { en: 'Food Service', zh: '技术' }, image: '/graphics/capri.jpg', showname: false, url: 'https://www.facebook.com/CapriArtCafe/' },
		{ name: 'Care for Tribes International', sector: { en: 'NGO', zh: '' }, image: '/graphics/cfti.jpg', showname: false, url: 'https://www.facebook.com/carefortribes/' },
		{ name: 'FINAC', sector: { en: 'Association', zh: '物流' }, image: '/graphics/finac.jpg', showname: false },
		{ name: 'Food Rescue Philippines', sector: { en: 'Charity', zh: '物流' }, image: '/graphics/foodrescue.jpg', showname: true, url: 'https://www.facebook.com/foodrescuephilippines/' },
		{ name: 'Greenlife Coconut Products', sector: { en: 'Agriculture', zh: '技术' }, image: '/graphics/greenlife.jpg', showname: false, url: 'https://www.greenlifecocoph.com/' },
		{ name: 'Himalayan Asia', sector: { en: 'Engineering', zh: '物流' }, image: '/graphics/hima.jpg', showname: false, url: 'https://www.facebook.com/Himalayanasia/' },
		{ name: 'PDMSI', sector: { en: 'Association', zh: '技术' }, image: '/graphics/pdmsi.jpg', showname: false },
		{ name: 'Neo-Holistic Yoga', sector: { en: 'Yoga Studio', zh: '' }, image: '/graphics/neo.jpg', showname: false, url: 'https://www.facebook.com/neoholisticyoga/' },
		{ name: 'San Pedro CAO', sector: { en: 'Government', zh: '社区网络' }, image: '/graphics/cao.jpg', showname: false },
		{ name: 'SCENAC', sector: { en: 'NGO', zh: '' }, image: '/graphics/scenac.jpg', showname: false, url: 'https://www.facebook.com/scenacph/' },
		{ name: 'Unlad Saka', sector: { en: 'Agriculture', zh: '技术' }, image: '/graphics/unlad.jpg', showname: false, url: 'https://unladsaka.com/' },
		{ name: 'Venezuela Gente Excelente', sector: { en: 'Association', zh: '技术' }, image: '/graphics/vge.jpg', showname: false },
		{ name: 'Yoga Hoa Sen', sector: { en: 'Wellness', zh: '技术' }, image: '/graphics/hoasen.jpg', showname: false, url: 'https://yogahoasen.com/' }
	];

	const tabs = [
		{ id: 'about', label: { en: 'About', zh: '关于', fr: 'À propos', es: 'Acerca de', vi: 'Giới thiệu' }, icon: Info, type: 'internal' },
		{ id: 'team', label: { en: 'Team', zh: '团队', fr: 'Équipe', es: 'Equipo', vi: 'Đội ngũ' }, icon: Users, type: 'internal' },
		{ id: 'partners', label: { en: 'Partners', zh: '合作伙伴', fr: 'Partenaires', es: 'Socios', vi: 'Đối tác' }, icon: Handshake, type: 'internal' },
		{ id: 'privacy', label: { en: 'Privacy & Terms', zh: '隐私与条款', fr: 'Confidentialité et conditions', es: 'Privacidad y términos', vi: 'Quyền riêng tư và Điều khoản' }, icon: ShieldCheck, type: 'link', href: '/privacy' },
		{ id: 'faq', label: { en: 'FAQ', zh: 'FAQ', fr: 'FAQ', es: 'FAQ', vi: 'FAQ' }, icon: CircleQuestionMark, type: 'link', href: '/faq' },
		{ id: 'youtube', label: { en: 'YouTube', zh: 'YouTube', fr: 'YouTube', es: 'YouTube', vi: 'YouTube' }, icon: Youtube, type: 'link', href: 'https://youtube.com/@pantrypoints', external: true }
	];

	function getLabel(tab: typeof tabs[0]): string {
		const locale = getLocale() as keyof typeof tab.label;
		return tab.label[locale] || tab.label.en;
	}

	function getSectorText(partner: Partner): string {
		const locale = getLocale() as keyof Partner['sector'];
		return partner.sector[locale] || partner.sector.en;
	}

	function getCardStyle(partner: Partner): string {
		if (!partner.image) return 'bg-teal-600';
		return 'bg-cover bg-center';
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
					{t('about_badge')}
				</div>
				<h1 class="mb-3 text-4xl font-800 text-white sm:text-5xl drop-shadow-lg">
					{t('about_title')}
				</h1>
				<p class="text-lg text-white/90">
					{t('about_subtitle')}
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
				<h2>{t('about_heading')}</h2>
				<p class="text-lg leading-relaxed">
					{t('about_description')} <a href='https://www.superphysics.org/social/economics/' target="_blank">Economic Superphysics</a>
				</p>
				
				<h3>{t('about_mission_heading')}</h3>
				<p>{t('about_mission_text')}</p>
				
				<h3>{t('about_vision_heading')}</h3>
				<p>{t('about_vision_text')}</p>
				
				<h3>{t('about_values_heading')}</h3>
				<ul>
					<li><strong>{t('about_value_1_title')}:</strong> {t('about_value_1_desc')}</li>
					<li><strong>{t('about_value_2_title')}:</strong> {t('about_value_2_desc')}</li>
					<li><strong>{t('about_value_3_title')}:</strong> {t('about_value_3_desc')}</li>
					<li><strong>{t('about_value_4_title')}:</strong> {t('about_value_4_desc')}</li>
				</ul>
			</div>

		{:else if activeTab === 'team'}
			<div in:fly={{ y: 20, duration: 300 }}>
				<h2 class="mb-8 text-2xl font-700 text-slate-900">{t('team_heading')}</h2>
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
								{member.role[getLocale()] || member.role.en}
							</p>
						</div>
					{/each}
				</div>
			</div>

		{:else if activeTab === 'partners'}
			<div in:fade>
				<h2 class="mb-8 text-2xl font-700 text-slate-900">{t('partners_heading')}</h2>

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