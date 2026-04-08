<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="docs"
  vid="/blog.mp4"
  title="Documentation for Pantrypreneur Farm"
  subtitle="Pantrypreneur Farm Solo is small plot management app"
  badgeText={m.reference()}
/>


