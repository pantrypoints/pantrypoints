<script lang="ts">
  import { onMount } from 'svelte';

  interface Award {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    url?: string;
    flag?: string;
  }
  
  let { 
    awards = [
      { id: '150', icon: '/icons/hatch.jpg', title: 'Top 10, 2015', subtitle: 'Hack for Social Good, Vietnam', url: '/news/15-10-24', flag: 'Vietnam' },
      { id: '162', icon: '/icons/magic.jpg', title: 'Top 20, 2016', subtitle: 'ASEANs Next Great Idea', url: '/news/16-12-09', flag: 'Malaysia' },
      { id: '172', icon: '/icons/slush.jpg', title: 'Semifinalist, 2017', subtitle: 'Slush Global Impact Accelerator Vietnam', url: '/news/17-10-28', flag: 'Vietnam' },
      { id: '177', icon: '/icons/blockathon.jpg', title: '2nd Place, 2017', subtitle: 'Vietnam Blockathon', url: '/news/17-11-26', flag: 'Vietnam' },
      { id: '180', icon: '/icons/nasa.jpg', title: 'Most Inspiring, 2018', subtitle: 'NASA Hackathon', url: '/news/18-10-21', flag: 'Philippines' },
      { id: '181', icon: '/icons/techfest.jpg', title: 'Top 10, 2018', subtitle: 'Aboitiz Decode Hackathon', url: '/news/18-11-10', flag: 'Philippines' },
      { id: '188', icon: '/icons/blockdevs.jpg', title: 'Special Prize, 2018', subtitle: 'DISH Hackathon Manila', url: '/news/18-11-24', flag: 'Philippines' },
      { id: '196', icon: '/icons/impact.jpg', title: 'Top 10, 2019', subtitle: 'Impacthub Hackathon', url: '/news/19-10-31', flag: 'Philippines' },
      { id: '192', icon: '/icons/wv2.jpg', subtitle: 'Social Innovation Challenge, World Vision', title: '2nd Place, 2019', url: '/news/19-08-14', flag: 'Philippines' },
      { id: '201', icon: '/icons/hackdays.jpg', title: 'Top 5, 2020', subtitle: 'AWS Hackdays', url: '/news/20-07-23', flag: 'Philippines' },
      { id: '200', icon: '/icons/ninja.jpg', title: 'Participant, 2020', subtitle: 'Project NINJA by JICA', url: '/news/20-12-10', flag: 'Singapore' },
      { id: '216', icon: '/icons/habitat.jpg', title: 'Preliminary Round, 2021', subtitle: 'Plastics Hackathon by UN Habitat', url: '/news/21-06-05', flag: 'Philippines' },
      { id: '222', icon: '/icons/fish.jpg', title: 'Finalist, 2022', subtitle: 'Fishackathon', url: '/news/22-02-01', flag: 'Singapore' },
      { id: '230', icon: '/icons/searca.jpg', title: 'Top 40, 2023', subtitle: 'SEARCA FLExPHD Planetary Health Diet', url: '/news/23-04-28', flag: 'Philippines' },
      { id: '231', icon: '/icons/pioneer.png', title: 'Top 40, 2023', subtitle: 'Pioneer', url: 'https://pioneer.app/' },
      { id: '240', icon: '/icons/rotary.jpg', title: 'Participant, 2024', subtitle: 'Hatch Project by Rotary Club', url: '/news/24-08-10', flag: 'Philippines' },
      { id: '241', icon: '/icons/caiec.jpg', title: 'Participant, 2024', subtitle: 'CAIEC China-ASEAN Innovation', url: '/news/24-03-12', flag: 'China' },
    ]
  } = $props();
  
  let tickerContent: HTMLDivElement;
  let animationFrame: number;
  let position = $state(0);
  let isPaused = $state(false);
  let containerWidth = 0;
  let contentWidth = 0;
  let displayAwards = $derived([...awards, ...awards, ...awards]);
  
  // Flag emoji mapping
  const flagEmojis: Record<string, string> = {
    'Vietnam': '🇻🇳',
    'USA': '🇺🇸',
    'Canada': '🇨🇦',
    'UK': '🇬🇧',
    'Philippines': '🇵🇭',
    'Japan': '🇯🇵',
    'China': '🇨🇳',
    'Korea': '🇰🇷',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Thailand': '🇹🇭',
    'Singapore': '🇸🇬',
    'Malaysia': '🇲🇾',
    'Indonesia': '🇮🇩',
    'India': '🇮🇳'
  };
  
  function getFlagEmoji(flag: string | undefined): string {
    if (!flag) return '';
    return flagEmojis[flag] || flag;
  }
  
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
      Our Awards & Rankings
    </h2>
    
    <!-- Decoration -->
    <div class="flex items-center justify-center gap-4 mt-2">
      <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      <span class="text-amber-500 dark:text-amber-400 text-base">★</span>
      <div class="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
    </div>
  </div>
  
  <div class="relative overflow-hidden w-full">
    <div class="w-full overflow-hidden cursor-pointer" 
         onmouseenter={handleMouseEnter} 
         onmouseleave={handleMouseLeave}>
      <div bind:this={tickerContent} 
           class="flex gap-6 md:gap-8 whitespace-nowrap will-change-transform">
        {#each displayAwards as award, index (award.id + index)}
          <div class="flex-shrink-0 w-[160px] md:w-[200px] bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-gray-900/30 relative">
          
            {#if award.url}
              <a href={award.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="block text-center no-underline">
                <div class="w-12 h-12 md:w-[60px] md:h-[60px] mx-auto mb-3 flex items-center justify-center">
                  <img src={award.icon} alt={award.title} loading="lazy" class="max-w-full max-h-full object-contain" />
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
                  <img src={award.icon} alt={award.title} loading="lazy" class="max-w-full max-h-full object-contain" />
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
            {#if award.flag}
              <div class="text-center text-lg md:text-xl" title={award.flag}>
                {getFlagEmoji(award.flag)}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>