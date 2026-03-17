// Types
export interface ContentArticle {
	slug: string;
	title: string;
	description: string;
	date: string;
	image: string;
	author: string;
	tags: string[];
	lang: string;
	content?: string; // Optional for when you need the full content
}

export interface ContentMetadata {
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
}

export type ContentType = 'news' | 'docs' | 'privacy' | 'faq' | 'terms';

// Configuration for different content types
const contentPaths: Record<ContentType, string> = {
	news: '/src/content/{lang}/news/*.md',
	docs: '/src/content/{lang}/docs/*.md',
	privacy: '/src/content/{lang}/privacy/*.md',
	faq: '/src/content/{lang}/faq/*.md',
	terms: '/src/content/{lang}/terms.md'
};


/**
 * Load all articles of a specific content type for a given language
 */
export async function loadContent(
	type: ContentType, 
	lang: string = 'en'
): Promise<ContentArticle[]> {
	// Convert the path pattern to a glob pattern
	const pathPattern = contentPaths[type].replace('{lang}', lang);
	
	// Dynamic import based on language
	const modules = import.meta.glob('/src/content/**/*.md');
	
	// Filter modules by language and type
	const filteredModules: Record<string, () => Promise<unknown>> = {};
	
	for (const [path, loader] of Object.entries(modules)) {
		if (path.includes(`/content/${lang}/${type}/`)) {
			filteredModules[path] = loader;
		}
	}

	const articles: ContentArticle[] = [];

	for (const [path, loader] of Object.entries(filteredModules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		try {
			const mod = await loader();
			const metadata = (mod as unknown as { metadata: ContentMetadata }).metadata;
			
			if (metadata) {
				articles.push({
					slug,
					title: metadata.title ?? slug,
					description: metadata.description ?? '',
					image: metadata.image ?? '',
					date: metadata.date ?? '',
					author: metadata.author ?? '',
					tags: metadata.tags ?? [],
					lang
				});
			}
		} catch (e) {
			console.error(`Failed to load ${path}:`, e);
		}
	}

	return articles.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Load a single article by slug
 */
export async function loadContentBySlug(
	type: ContentType,
	slug: string,
	lang: string = 'en'
): Promise<ContentArticle | null> {
	try {
		const modules = import.meta.glob('/src/content/**/*.md', { eager: false });
		
		for (const [path, loader] of Object.entries(modules)) {
			if (path.includes(`/content/${lang}/${type}/${slug}.md`)) {
				const mod = await loader();
				const metadata = (mod as unknown as { metadata: ContentMetadata }).metadata;
				const content = (mod as unknown as { default: string }).default;
				
				if (metadata) {
					return {
						slug,
						title: metadata.title ?? slug,
						image: metadata.image ?? '',
						description: metadata.description ?? '',
						date: metadata.date ?? '',
						author: metadata.author ?? '',
						tags: metadata.tags ?? [],
						lang,
						content
					};
				}
			}
		}
		return null;
	} catch (e) {
		console.error(`Failed to load ${type}/${slug} in ${lang}:`, e);
		return null;
	}
}

/**
 * Search through articles
 */
export function searchContent(
	articles: ContentArticle[], 
	query: string
): ContentArticle[] {
	const q = query.toLowerCase().trim();
	if (!q) return articles;
	
	return articles.filter(
		(a) =>
			a.title.toLowerCase().includes(q) ||
			a.description.toLowerCase().includes(q) ||
			a.tags.some((tag) => tag.toLowerCase().includes(q))
	);
}

/**
 * Format date based on language
 */
export function formatDate(dateStr: string, lang: string): string {
	try {
		const date = new Date(dateStr);
		return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch {
		return dateStr;
	}
}

/**
 * Get all available content types
 */
export function getContentTypes(): ContentType[] {
	return Object.keys(contentPaths) as ContentType[];
}

/**
 * Get content counts per language/type
 */
export async function getContentStats() {
	const stats: Record<string, Record<ContentType, number>> = {
		en: {} as Record<ContentType, number>,
		zh: {} as Record<ContentType, number>
	};
	
	for (const lang of ['en', 'zh'] as const) {
		for (const type of getContentTypes()) {
			const articles = await loadContent(type, lang);
			stats[lang][type] = articles.length;
		}
	}
	
	return stats;
}

