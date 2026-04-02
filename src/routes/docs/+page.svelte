<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="docs"
  vid="/blog.mp4"
  title={m.docs_title()}
  subtitle={m.docs_sub()}
  badgeText={m.reference()}
/>


