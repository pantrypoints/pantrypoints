<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  let { data } = $props();

  const titles: Record<string, string> = {
    circle: 'Pantrypoints Circle Documentation',
    health: 'Pantrypreneur Health Documentation',
    supereconomics: 'Supereconomics',
    farm: 'Pantrypreneur Farm Documentation',
    match: 'Pantrypreneur Match Documentation',
    world: 'Pantrypoints World Documentation',
    preneur: 'Pantrypreneur Documentation',
    educate: 'Pantrypreneur Educate Documentation',
    galaxiv: 'Galaxiv Documentation',
    pantrylitics: 'Pantrylitics Documentation',
    predict: 'Superphysics Predict Documentation',
  };
</script>

<ContentList
  articles={data.articles}
  contentType={data.type}
  vid="/blog.mp4"
  title={titles[data.type] ?? 'Documentation'}
  subtitle=""
  badgeText="Reference"
/>