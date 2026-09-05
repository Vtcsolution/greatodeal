import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/images/*.mp4'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Explicit allow rules for AI/answer-engine crawlers, so assistants like ChatGPT,
      // Claude, Perplexity, and Gemini can read and cite this site (AEO). The wildcard
      // rule above already permits these by default; naming them removes any ambiguity.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Amazonbot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/admin/', '/api/'] },
    ],
    sitemap: 'https://greatodeal.com/sitemap.xml',
    host: 'https://greatodeal.com',
  };
}
