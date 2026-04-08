import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';

type ContentType = 'circle' | 'health' | 'galaxiv' | 'supereconomics' | string;

interface LoadArticleOptions {
  slug: string;
  lang?: string;
  contentType: ContentType;
  transformImagePaths?: (html: string) => string;
}

interface ArticleMetadata {
  title: string;
  description?: string;
  date?: string;
  image?: string;
  writer?: { name: string };
  author?: string;
  tags?: string[];
  [key: string]: any;
}

interface LoadedArticle {
  article: {
    slug: string;
    title: string;
    description: string;
    date?: string;
    image?: string;
    author: string;
    tags: string[];
  };
  content: string;
}

interface GetAllArticlesOptions {
  contentType: string;
  lang: string;
}

export async function getAllArticles({ contentType, lang }: GetAllArticlesOptions) {
  try {
    // Glob all markdown files for this content type
    const modules = import.meta.glob('/src/content/**/*.md');
    
    const articles = await Promise.all(
      Object.entries(modules)
        .filter(([path]) => {
          // Match paths like: /src/content/en/docs/health/anything.md
          const pattern = new RegExp(`/${lang}/docs/${contentType}/([^/]+)\\.md$`);
          return pattern.test(path);
        })
        .map(async ([path, loader]) => {
          const mod = await loader() as any;
          const slug = path.split('/').pop()?.replace('.md', '') || '';
          
          return {
            slug,
            title: mod.metadata.title,
            description: mod.metadata.description || '',
            date: mod.metadata.date,
            image: mod.metadata.image,
            author: mod.metadata.writer?.name || mod.metadata.author || 'Pantrypoints Team',
            tags: mod.metadata.tags || [],
          };
        })
    );
    
    // Sort by date (newest first)
    return articles.sort((a, b) => 
      new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
  } catch (e) {
    console.error(`Failed to load articles for ${contentType}:`, e);
    return [];
  }
}

/**
 * Load and render a markdown article from the content directory
 */
export async function loadArticle({
  slug,
  lang = 'en',
  contentType,
  transformImagePaths
}: LoadArticleOptions): Promise<LoadedArticle> {
  try {
    // Dynamically build the glob pattern based on content type
    const modules = import.meta.glob('/src/content/**/*.md');
    
    // Find the matching markdown file
    const path = Object.keys(modules).find(p => {
      const pattern1 = `/${lang}/docs/${contentType}/${slug}.md`;
      const pattern2 = `/en/docs/${contentType}/${slug}.md`;
      return p.includes(pattern1) || p.includes(pattern2);
    });
    
    if (!path) {
      throw error(404, `Article not found: ${contentType}/${slug}`);
    }
    
    const loader = modules[path];
    const mod = await loader() as any;
    
    // Render the Svelte component
    const rendered = render(mod.default, { props: {} });
    
    // Apply image path transformation if provided
    let content = rendered.body;
    if (transformImagePaths) {
      content = transformImagePaths(content);
    }
    
    return {
      article: {
        slug,
        title: mod.metadata.title,
        description: mod.metadata.description || '',
        date: mod.metadata.date,
        image: mod.metadata.image,
        author: mod.metadata.writer?.name || mod.metadata.author || 'Pantrypoints Team',
        tags: mod.metadata.tags || [],
      },
      content
    };
  } catch (e) {
    console.error(`Failed to load article ${contentType}/${slug}:`, e);
    throw error(404, 'Article not found');
  }
}

/**
 * Optional: Image path transformer for markdown images
 */
export function transformMarkdownImages(html: string, basePath?: string): string {
  const imageBasePath = basePath || '/docs/images';
  
  // Transform markdown image syntax
  let transformed = html.replace(
    /!\[([^\]]*)\]\((\.\.?\/)?(images\/[^\)]+)\)/g,
    (match, alt, dots, imagePath) => {
      const filename = imagePath.split('/').pop();
      return `![${alt}](${imageBasePath}/${filename})`;
    }
  );
  
  // Transform img src attributes
  transformed = transformed.replace(
    /<img([^>]*)src=["'](\.\.?\/)?(images\/[^"']+)["']([^>]*)>/g,
    (match, before, dots, imagePath, after) => {
      const filename = imagePath.split('/').pop();
      return `<img${before}src="${imageBasePath}/${filename}"${after}>`;
    }
  );
  
  return transformed;
}

