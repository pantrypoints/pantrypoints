export interface NewsArticle {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
	lang: string;
}

export interface NewsMetadata {
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
}

export async function loadNewsArticles(lang: string): Promise<NewsArticle[]> {
	const enModules = import.meta.glob('/src/content/en/news/*.md');
	const zhModules = import.meta.glob('/src/content/zh/news/*.md');
	const modules = lang === 'zh' ? zhModules : enModules;

	const articles: NewsArticle[] = [];

	for (const [path, loader] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		try {
			const mod = await loader();
			const metadata = (mod as unknown as { metadata: NewsMetadata }).metadata;
			if (metadata) {
				articles.push({
					slug,
					title: metadata.title ?? slug,
					description: metadata.description ?? '',
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

export function searchNews(articles: NewsArticle[], query: string): NewsArticle[] {
	const q = query.toLowerCase().trim();
	if (!q) return articles;
	return articles.filter(
		(a) =>
			a.title.toLowerCase().includes(q) ||
			a.description.toLowerCase().includes(q) ||
			a.tags.some((tag) => tag.toLowerCase().includes(q))
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
