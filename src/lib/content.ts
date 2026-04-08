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
	icon: string;
	draft?: boolean;
	content?: string;
	type: ContentType; // Added to ensure type safety in paths
}

export interface ContentMetadata {
	title: string;
	description: string;
	date: string;
	author: string;
	icon: string;
	tags: string[];
	image?: string;
	draft?: boolean;
}

// 1. UPDATED: Expanded Union Type
export type ContentType = 
	| 'news' | 'docs' | 'privacy' | 'faq' | 'terms'
	| 'circle' | 'health' | 'supereconomics' | 'farm' 
	| 'match' | 'world' | 'preneur' | 'educate' 
	| 'galaxiv' | 'pantrylitics' | 'predict';

// 2. Configuration for paths
const contentPaths: Record<ContentType, string> = {
	news: '/src/content/{lang}/news/*.md',
	docs: '/src/content/{lang}/docs/*.md',
	circle: '/src/content/{lang}/docs/circle/*.md',
	health: '/src/content/{lang}/docs/health/*.md',
	supereconomics: '/src/content/{lang}/docs/supereconomics/*.md',
	farm: '/src/content/{lang}/docs/farm/*.md',
	match: '/src/content/{lang}/docs/match/*.md',
	world: '/src/content/{lang}/docs/world/*.md',
	preneur: '/src/content/{lang}/docs/preneur/*.md',
	educate: '/src/content/{lang}/docs/educate/*.md',
	galaxiv: '/src/content/{lang}/docs/galaxiv/*.md',
	pantrylitics: '/src/content/{lang}/docs/pantrylitics/*.md',
	predict: '/src/content/{lang}/docs/predict/*.md',
	privacy: '/src/content/{lang}/privacy/*.md',
	faq: '/src/content/{lang}/faq/*.md',
	terms: '/src/content/{lang}/terms.md'
};

// 3. UPDATED: Helper to map ContentType to actual filesystem folder paths
const getFolder = (type: ContentType) => {
	const nestedDocs = [
		'circle', 'health', 'supereconomics', 'farm', 'match', 
		'world', 'preneur', 'educate', 'galaxiv', 'pantrylitics', 'predict'
	];
	if (nestedDocs.includes(type)) return `docs/${type}`;
	return type;
};

export async function loadContent(
	type: ContentType,
	lang: string = 'en',
	includeDrafts: boolean = false
): Promise<ContentArticle[]> {
	const modules = import.meta.glob('/src/content/**/*.md');
	const filteredModules: Record<string, () => Promise<unknown>> = {};
	const folder = getFolder(type);

	for (const [path, loader] of Object.entries(modules)) {
		if (path.includes(`/content/${lang}/${folder}/`)) {
			// 4. IMPROVED: Automatically exclude all sub-directories when loading the top-level 'docs'
			if (type === 'docs' && path.split(`/content/${lang}/docs/`)[1]?.includes('/')) {
				continue;
			}
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
				if (metadata.draft && !includeDrafts) continue;
				articles.push({
					slug,
					title: metadata.title ?? slug,
					description: metadata.description ?? '',
					image: metadata.image ?? '',
					icon: metadata.icon || '/icons/pantry50.png',
					date: metadata.date ?? '',
					author: metadata.author ?? '',
					tags: metadata.tags ?? [],
					lang,
					type,
					draft: metadata.draft ?? false
				});
			}
		} catch (e) {
			console.error(`Failed to load ${path}:`, e);
		}
	}
	return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export async function loadContentBySlug(
	type: ContentType,
	slug: string,
	lang: string = 'en',
	includeDrafts: boolean = false
): Promise<ContentArticle | null> {
	try {
		const modules = import.meta.glob('/src/content/**/*.md', { eager: false });
		const folder = getFolder(type);

		for (const [path, loader] of Object.entries(modules)) {
			if (path.includes(`/content/${lang}/${folder}/${slug}.md`)) {
				const mod = await loader();
				const metadata = (mod as unknown as { metadata: ContentMetadata }).metadata;
				const content = (mod as unknown as { default: string }).default;
				if (metadata) {
					if (metadata.draft && !includeDrafts) return null;
					return {
						slug,
						title: metadata.title ?? slug,
						image: metadata.image ?? '',
						icon: metadata.icon ?? '',
						description: metadata.description ?? '',
						date: metadata.date ?? '',
						author: metadata.author ?? '',
						tags: metadata.tags ?? [],
						lang,
						type,
						draft: metadata.draft ?? false,
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



export async function loadPublishedContent(type: ContentType, lang: string = 'en'): Promise<ContentArticle[]> {
	return loadContent(type, lang, false);
}

export async function loadContentWithDrafts(type: ContentType, lang: string = 'en'): Promise<ContentArticle[]> {
	return loadContent(type, lang, true);
}

export function searchContent(articles: ContentArticle[], query: string): ContentArticle[] {
	const q = query.toLowerCase().trim();
	if (!q) return articles;
	return articles.filter((a) => !a.draft && 
		(a.title.toLowerCase().includes(q) || 
		 a.description.toLowerCase().includes(q) || 
		 a.tags.some((tag) => tag.toLowerCase().includes(q)))
	);
}

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

export function getContentTypes(): ContentType[] {
	return Object.keys(contentPaths) as ContentType[];
}

export async function getContentStats() {
	const stats: Record<string, Record<ContentType, number>> = {
		en: {} as Record<ContentType, number>,
		zh: {} as Record<ContentType, number>
	};
	for (const lang of ['en', 'zh'] as const) {
		for (const type of getContentTypes()) {
			const articles = await loadPublishedContent(type, lang);
			stats[lang][type] = articles.length;
		}
	}
	return stats;
}

export function isPublished(article: ContentArticle): boolean {
	return !article.draft;
}

export async function getAllTags(lang: string = 'en'): Promise<string[]> {
	const tagSet = new Set<string>();
	const types = getContentTypes();
	for (const type of types) {
		const articles = await loadPublishedContent(type, lang);
		articles.forEach((article) => {
			article.tags.forEach((tag) => tagSet.add(tag));
		});
	}
	return Array.from(tagSet).sort();
}

export async function getArticlesByTag(lang: string = 'en'): Promise<Record<string, ContentArticle[]>> {
	const grouped: Record<string, ContentArticle[]> = {};
	const types = getContentTypes();
	for (const type of types) {
		const articles = await loadPublishedContent(type, lang);
		articles.forEach((article) => {
			article.tags.forEach((tag) => {
				if (!grouped[tag]) grouped[tag] = [];
				grouped[tag].push(article);
			});
		});
	}
	for (const tag of Object.keys(grouped)) {
		grouped[tag].sort((a, b) => b.date.localeCompare(a.date));
	}
	return grouped;
}

export async function getTagCounts(lang: string = 'en'): Promise<Record<string, number>> {
	const counts: Record<string, number> = {};
	const types = getContentTypes();
	for (const type of types) {
		const articles = await loadPublishedContent(type, lang);
		articles.forEach((article) => {
			article.tags.forEach((tag) => {
				counts[tag] = (counts[tag] ?? 0) + 1;
			});
		});
	}
	return counts;
}

export async function getTagsWithArticles(lang: string = 'en'): Promise<Array<{name: string; count: number; articles: ContentArticle[];}>> {
	const grouped = await getArticlesByTag(lang);
	return Object.entries(grouped)
		.map(([name, articles]) => ({ name, count: articles.length, articles }))
		.sort((a, b) => b.count - a.count);
}



// export function getArticlePath(article: ContentArticle): string {
// 	if (article.slug === 'terms' || article.type === 'terms') {
// 		return '/terms';
// 	}
	
// 	// 5. UPDATED: Dynamically generate route based on nested structure
// 	const folderRoute = getFolder(article.type);
// 	const langPrefix = article.lang === 'en' ? '' : `/${article.lang}`;
	
// 	return `${langPrefix}/${folderRoute}/${article.slug}`;
// }


export function getArticlePath(article: ContentArticle): string {
  // if (article.slug === 'terms' || article.type === 'terms') return '/terms';

  const langPrefix = article.lang === 'en' ? '' : `/${article.lang}`;

  // Nested doc sections have their own routes under /docs/<section>/
  const nestedDocs = ['circle', 'health', 'supereconomics', 'farm', 
    'match', 'world', 'preneur', 'educate', 'galaxiv', 'pantrylitics', 'predict'];

  if (nestedDocs.includes(article.type)) {
    return `${langPrefix}/docs/${article.type}/${article.slug}`;
  }

  return `${langPrefix}/${article.type}/${article.slug}`;
}