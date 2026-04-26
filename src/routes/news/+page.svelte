<script lang="ts">
  import ContentList from '$lib/components/Contentlist.svelte';
  import { t } from '$lib/i18n';
  
  let { data } = $props();
</script>

<ContentList
  articles={data.articles}
  contentType="news"
  vid="/vid.mp4"
  title={t('news_title')}
  subtitle={t('news_subtitle')}
  badgeText={t('news_badge')}
/>