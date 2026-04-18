<script lang="ts">
	import { onMount } from 'svelte';

	interface Award {
		id: string;
		icon: string;
		title: string;
		subtitle: string;
		url?: string;
	}

	let { 
		awards = [],
		title = "Our Awards & Rankings"
	} = $props();

	let tickerContent: HTMLDivElement;
	let animationFrame: number;
	let position = $state(0);
	let isPaused = $state(false);
	let containerWidth = 0;
	let contentWidth = 0;

	let displayAwards = $derived([...awards, ...awards, ...awards]);

	onMount(() => {
		updateWidths();
		window.addEventListener('resize', updateWidths);
		startAnimation();
		
		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', updateWidths);
		};
	});

	function updateWidths() {
		if (tickerContent) {
			containerWidth = tickerContent.parentElement?.offsetWidth || 0;
			contentWidth = tickerContent.scrollWidth / 3;
		}
	}

	function startAnimation() {
		let lastTimestamp = 0;
		const speed = 80;
		
		function animate(timestamp: number) {
			if (!lastTimestamp) {
				lastTimestamp = timestamp;
				animationFrame = requestAnimationFrame(animate);
				return;
			}
			
			const delta = (timestamp - lastTimestamp) / 1000;
			lastTimestamp = timestamp;
			
			if (!isPaused) {
				position -= speed * delta;
				
				if (Math.abs(position) >= contentWidth) {
					position = 0;
				}
				
				if (tickerContent) {
					tickerContent.style.transform = `translateX(${position}px)`;
				}
			}
			
			animationFrame = requestAnimationFrame(animate);
		}
		
		animationFrame = requestAnimationFrame(animate);
	}

	function handleMouseEnter() {
		isPaused = true;
	}

	function handleMouseLeave() {
		isPaused = false;
	}
</script>

<div class="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
	<div class="text-center pb-6">
		<h2 class="font-display mb-4 text-4xl md:text-5xl font-700 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
			{title}
		</h2>
		
		<!-- Decoration -->
		<div class="flex items-center justify-center gap-4 mt-2">
			<div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
			<span class="text-amber-500 dark:text-amber-400 text-base">★</span>
			<div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
		</div>
	</div>
	
	<div class="relative overflow-hidden w-full">
		<div 
			class="w-full overflow-hidden cursor-pointer"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}>
			<div 
				bind:this={tickerContent}
				class="flex gap-6 md:gap-8 whitespace-nowrap will-change-transform">
				{#each displayAwards as award, index (award.id + index)}
					<div class="flex-shrink-0 w-[160px] md:w-[200px] bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-gray-900/30">
						{#if award.url}
							<a 
								href={award.url} 
								target="_blank" 
								rel="noopener noreferrer" 
								class="block text-center no-underline">
								<div class="w-12 h-12 md:w-[60px] md:h-[60px] mx-auto mb-3 flex items-center justify-center">
									<img 
										src={award.icon} 
										alt={award.title} 
										loading="lazy" 
										class="max-w-full max-h-full object-contain" />
								</div>
								<div>
									<h3 class="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1 whitespace-normal break-words leading-tight">
										{award.title}
									</h3>
									<p class="text-xs md:text-sm text-slate-600 dark:text-gray-400 whitespace-normal break-words">
										{award.subtitle}
									</p>
								</div>
							</a>
						{:else}
							<div class="block text-center">
								<div class="w-12 h-12 md:w-[60px] md:h-[60px] mx-auto mb-3 flex items-center justify-center">
									<img 
										src={award.icon} 
										alt={award.title} 
										loading="lazy" 
										class="max-w-full max-h-full object-contain" />
								</div>
								<div>
									<h3 class="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1 whitespace-normal break-words leading-tight">
										{award.title}
									</h3>
									<p class="text-xs md:text-sm text-slate-600 dark:text-gray-400 whitespace-normal break-words">
										{award.subtitle}
									</p>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>