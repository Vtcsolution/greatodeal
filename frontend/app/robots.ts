import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/images/*.mp4', '/product/*', '/cart/*', '/checkout/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/product/*', '/cart/*', '/checkout/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/product/*', '/cart/*', '/checkout/*'],
      },
    ],
    sitemap: 'https://greatodeal.com/sitemap.xml',
    host: 'https://greatodeal.com',
  };
}
