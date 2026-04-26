<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	const locations = [
		{ id: 'laspinas', cityKey: 'laspinas', country: 'Philippines', flag: '/flags/ph.png', url: 'https://maps.app.goo.gl/example1' },
		{ id: 'thimphu', cityKey: 'thimphu', country: 'Bhutan', flag: '/flags/bt.png', url: 'https://maps.app.goo.gl/example2' },
		{ id: 'peshawar', cityKey: 'peshawar', country: 'Pakistan', flag: '/flags/pk.png', url: 'https://maps.app.goo.gl/example3' },
		{ id: 'saigon', cityKey: 'saigon', country: 'Vietnam', flag: '/flags/vn.png', url: 'https://maps.app.goo.gl/example4' }
	];
</script>

<section class="py-16">
	<div class="max-w-7xl mx-auto px-4">
	
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			{#each locations as location}
				<div class="group text-center">
				<!-- <a 
					href={location.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group text-center"
				> -->
					<div class="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-pastel-blue-light shadow-lg group-hover:scale-105 transition-transform">
						<img src={location.flag} alt={location.country} class="w-full h-full object-cover">
					</div>
					<h3 class="font-bold text-lg group-hover:text-pastel-blue-dark transition-colors">
						{t(location.cityKey)}
					</h3>
					<p class="text-sm text-white">{location.country}</p>
				</div>
			{/each}
		</div>
		
	</div>
</section>