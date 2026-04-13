<script lang="ts">
	import { onMount } from 'svelte';

	interface Award {
		id: string;
		icon: string; // URL or path to icon
		title: string;
		subtitle: string;
		url?: string; // External link if provided
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

	// Duplicate awards for seamless loop
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
			contentWidth = tickerContent.scrollWidth / 3; // Divide by 3 because we tripled the awards
		}
	}

	function startAnimation() {
		let lastTimestamp = 0;
		const speed = 80; // pixels per second
		
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
				
				// Reset position when we've scrolled one full set
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





<div class="text-center awards-ticker-wrapper py-4">
	<div class="awards-header pb-5">
		<h2 class="font-display mb-3 text-4xl font-700 text-slate-900">{title}</h2>
		<div class="awards-decoration pb-5">
			<span class="decoration-line"></span>
			<span class="decoration-star">★</span>
			<span class="decoration-line"></span>
		</div>
	</div>
	
	<div class="ticker-container">
		<div 
			class="ticker-track"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}>
			<div 
				bind:this={tickerContent}
				class="ticker-content">
				{#each displayAwards as award, index (award.id + index)}
					<div class="">
						{#if award.url}
							<a href={award.url} target="_blank" rel="noopener noreferrer" class="award-link">
								<div class="award-icon">
									<img src={award.icon} alt={award.title} loading="lazy" />
								</div>
								<div>
									<h3 class="dark:text-white font-bold">{award.title}</h3>
								 	<p class="dark:text-white text-sm">{award.subtitle}</p>
								</div>
							</a>
						{:else}
							<div class="award-link">
								<div class="award-icon">
									<img src={award.icon} alt={award.title} loading="lazy" />
								</div>
								<div class="award-text">
									<h3 class="award-title">{award.title}</h3>
									<p class="award-subtitle">{award.subtitle}</p>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.awards-ticker-wrapper {
		/*background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);*/
		padding: 6rem 0;
		/*border-top: 1px solid #e9ecef;
		border-bottom: 1px solid #e9ecef;*/
		position: relative;
		overflow: hidden;
	}

/*	.awards-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.awards-title {
		font-size: 2rem;
		font-weight: 700;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}*/

	.awards-decoration {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.decoration-line {
		width: 50px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #d4af37, transparent);
	}

	.decoration-star {
		color: #d4af37;
		font-size: 1rem;
	}

	.ticker-container {
		position: relative;
		overflow: hidden;
		width: 100%;
	}

	.ticker-track {
		width: 100%;
		overflow: hidden;
		cursor: pointer;
	}

	.ticker-content {
		display: flex;
		gap: 2rem;
		white-space: nowrap;
		will-change: transform;
	}

	.award-card {
		flex-shrink: 0;
		width: 200px;
		background: white;
		border-radius: 12px;
		padding: 1rem;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.award-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.award-link {
		text-decoration: none;
		display: block;
		text-align: center;
	}

	.award-icon {
		width: 60px;
		height: 60px;
		margin: 0 auto 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.award-icon img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.award-text {
		text-align: center;
	}

	.award-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: #1a1a2e;
		margin: 0 0 0.25rem 0;
		white-space: normal;
		word-wrap: break-word;
		line-height: 1.3;
	}

	.award-subtitle {
		font-size: 0.75rem;
		color: #6c757d;
		margin: 0;
		white-space: normal;
		word-wrap: break-word;
		line-height: 1.4;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.awards-ticker-wrapper {
			padding: 2rem 0;
		}

		.awards-title {
			font-size: 1.5rem;
		}

		.award-card {
			width: 160px;
			padding: 0.75rem;
		}

		.award-icon {
			width: 45px;
			height: 45px;
		}

		.award-title {
			font-size: 0.8rem;
		}

		.award-subtitle {
			font-size: 0.65rem;
		}
	}

	@media (max-width: 480px) {
		.award-card {
			width: 140px;
		}
	}
</style>