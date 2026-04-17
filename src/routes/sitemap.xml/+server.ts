import * as content from '$lib/content';
import { getCollection } from '$lib/registry';

export async function GET() {
    const siteUrl = 'https://pantrypoints.com';
    
    // 1. Get all dynamic content slugs
    // Since you have nested docs, you might loop through your ContentTypes
    const docs = await content.loadContent('docs');
    const circle = await content.loadContent('circle');
    const news = await content.loadContent('news');
    
    // 2. Define your static pages
    const staticPages = ['', 'about', 'contact', 'docs', 'pantrypreneur'];

    // 3. Build the XML string
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
        ${staticPages.map(page => `
        <url>
            <loc>${siteUrl}/${page}</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        `).join('')}

        ${circle.map(item => `
        <url>
            <loc>${siteUrl}/docs/circle/${item.slug}</loc>
            <lastmod>${item.date ? new Date(item.date).toISOString() : new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
        `).join('')}

        ${news.map(item => `
        <url>
            <loc>${siteUrl}/news/${item.slug}</loc>
            <lastmod>${new Date(item.date).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
        `).join('')}
    </urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600' // Cache for 1 hour
        }
    });
}