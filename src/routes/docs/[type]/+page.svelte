<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  let { data } = $props();

  const titles: Record<string, string> = {
    circle: 'Circle Documentation',
    health: 'Health Documentation',
    supereconomics: 'Supereconomics',
    farm: 'Farm Documentation',
    match: 'Match Documentation',
    world: 'World Documentation',
    preneur: 'Preneur Documentation',
    educate: 'Educate Documentation',
    galaxiv: 'Galaxiv Documentation',
    pantrylitics: 'Pantrylitics Documentation',
    predict: 'Predict Documentation',
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