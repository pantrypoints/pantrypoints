<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="educate"
  vid="/blog.mp4"
  title="Documentation for Pantrypreneur Educate"
  subtitle='Pantrypreneur Educate is a micro-small SaaS for trainers'
  badgeText={m.reference()}
/>


