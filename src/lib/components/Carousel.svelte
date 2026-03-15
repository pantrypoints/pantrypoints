<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	// Props
	export let steps: Array<{
		id: number;
		img: string;
		title: string;
		sub: string;
	}> = [];
	
	export let showSectionTitle: boolean = true;
	export let autoplay: boolean = true;
	export let autoplayInterval: number = 5000;
	export let showArrows: boolean = true;
	export let showDots: boolean = true;
	export let showNumberButtons: boolean = true;
	export let overlayText: boolean = true;
	export let textPosition: 'bottom' | 'top' | 'center' = 'bottom';
	
	let currentIndex = 0;
	let mounted = false;
	let autoplayTimer: NodeJS.Timeout;
	
	onMount(() => {
		mounted = true;
		startAutoplay();
		
		return () => {
			if (autoplayTimer) clearInterval(autoplayTimer);
		};
	});
	
	function startAutoplay() {
		if (autoplay) {
			autoplayTimer = setInterval(() => {
				nextSlide();
			}, autoplayInterval);
		}
	}
	
	function resetAutoplay() {
		if (autoplayTimer) clearInterval(autoplayTimer);
		startAutoplay();
	}
	
	function nextSlide() {
		currentIndex = (currentIndex + 1) % steps.length;
		resetAutoplay();
	}
	
	function prevSlide() {
		currentIndex = (currentIndex - 1 + steps.length) % steps.length;
		resetAutoplay();
	}
	
	function goToSlide(index: number) {
		currentIndex = index;
		resetAutoplay();
	}
	
	// Text position classes
const textPositionClasses = {
    bottom: 'bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/70 via-black/30 to-transparent',
    top: 'top-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-b from-black/70 via-black/30 to-transparent',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full p-8'
};
</script>




{#if steps.length > 0}
	<div class="w-full">
	<!-- <section class="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> -->
			<!-- Large Number Buttons (moved above the carousel) -->
			{#if showNumberButtons}
				<div class="flex justify-center gap-4 mb-8">
					{#each steps as step, index}
						<button
							on:click={() => goToSlide(index)}
							class={`
								relative w-16 h-16 rounded-2xl font-display font-800 text-2xl
								flex items-center justify-center transition-all duration-300 group
								${index === currentIndex 
									? 'bg-pastel-blue-dark dark:bg-pastel-blue-light text-white scale-110 shadow-xl' 
									: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'
								}
							`}
							aria-label={`Go to step ${step.id}`}
						>
							{step.id}
							
							<!-- Tooltip on hover -->
							<span class="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
								{step.title}
							</span>
						</button>
					{/each}
				</div>
			{/if}

			<!-- Carousel Container -->
			<div class="relative">
				<!-- Main Carousel -->
				<div class="overflow-hidden rounded-3xl shadow-2xl">
					<div 
						class="flex transition-transform duration-500 ease-out"
						style="transform: translateX(-{currentIndex * 100}%)">
						{#each steps as step, index}
							<div class="w-full flex-shrink-0 relative">
								<!-- Image - made larger by increasing aspect ratio -->
								<div class="relative aspect-[16/9] w-full">
									<img 
										src={step.img} 
										alt={step.title}
										class="absolute inset-0 w-full h-full object-cover"
										loading={index === 0 ? 'eager' : 'lazy'}
									/>
									
									<!-- Text Overlay -->
									{#if overlayText && mounted && index === currentIndex}
										<div 
											class="absolute {textPositionClasses[textPosition]} text-white"
											in:fly={{ y: 30, duration: 600, easing: quintOut }}
										>
											{#if textPosition === 'center'}
												<span class="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-display font-700 uppercase tracking-wider mb-4 border border-white/30">
													Step {step.id} of {steps.length}
												</span>
											{/if}
											<h3 class="font-display font-800 text-3xl md:text-4xl mb-3">{step.title}</h3>
											<p class="text-lg text-white/90 max-w-2xl {textPosition === 'center' ? 'mx-auto' : ''}">
												{step.sub}
											</p>
										</div>
									{/if}
									
									<!-- Step number badge (always visible) -->
									<div class="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-display font-800 text-2xl border-2 border-white/50 shadow-lg">
										{step.id}
									</div>
								</div>
								
								<!-- Alternative: Text below image (if overlay is disabled) -->
								{#if !overlayText}
									<div class="p-8 bg-white dark:bg-gray-800">
										<span class="inline-block px-3 py-1 rounded-full bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue text-xs font-display font-700 uppercase tracking-wider mb-3">
											Step {step.id}
										</span>
										<h3 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-2">{step.title}</h3>
										<p class="text-gray-600 dark:text-gray-400">{step.sub}</p>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				
				<!-- Navigation Arrows -->
				{#if showArrows}
					<button 
						on:click={prevSlide}
						class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
						aria-label="Previous step"
					>
						<ChevronLeft size={24} class="text-gray-800 dark:text-white" />
					</button>
					
					<button 
						on:click={nextSlide}
						class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
						aria-label="Next step"
					>
						<ChevronRight size={24} class="text-gray-800 dark:text-white" />
					</button>
				{/if}

				<!-- Dots Indicator -->
				{#if showDots}
					<div class="flex justify-center gap-3 mt-6">
						{#each steps as step, index}
							<button
								on:click={() => goToSlide(index)}
								class="group focus:outline-none"
								aria-label={`Go to step ${step.id}`}
							>
								<div 
									class="h-2 rounded-full transition-all duration-300 {index === currentIndex 
										? 'w-8 bg-pastel-blue-dark dark:bg-pastel-blue-light' 
										: 'w-2 bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
									}"
								></div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	<!-- </section> -->
{/if}