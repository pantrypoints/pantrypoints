<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="docs"
  vid="/blog.mp4"
  title="Documentation for Galaxiv"
  subtitle="Galaxiv is a realtime web-based strategy game that implements interstellar Supereconomics"
  badgeText={m.reference()}
/>


