<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	export let t: string = ''; // Target element ID to scroll to
	export let label: string = 'Scroll';
	
	function scrollToTarget() {
		if (t) {
			// Scroll to specific element by ID
			const element = document.getElementById(t);
			if (element) {
				element.scrollIntoView({ 
					behavior: 'smooth',
					block: 'start'
				});
			}
		} else {
			// Default: scroll down by one viewport height
			window.scrollBy({
				top: window.innerHeight,
				behavior: 'smooth'
			});
		}
	}
</script>

<!-- Scroll Button -->
<div class="flex justify-center pb-8 mt-12">
	<button 
		on:click={scrollToTarget}
		class="group relative w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-800 hover:bg-sky-200 dark:hover:bg-sky-700 transition-all duration-300 flex items-center justify-center cursor-pointer animate-bounce"
		aria-label={t ? `Scroll to ${t}` : label}
	>
		<ChevronDown size={24} class="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
		
		<!-- Subtle ring animation -->
		<span class="absolute inset-0 rounded-full animate-ping bg-gray-400/20 dark:bg-gray-600/20 opacity-75"></span>
	</button>
</div>