<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import * as m from '$lib/paraglide/messages';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="privacy"
  vid="/vid.mp4"
  title="Privacy Policy"
  subtitle="Here are the Policies for Pantrypoints"
  badgeText="Privacy"
/>

