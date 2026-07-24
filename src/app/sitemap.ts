import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bharathr.vercel.app';
  
  const routes = [
    '',
    '/about',
    '/skills',
    '/projects',
    '/certifications',
    '/contact',
    '/experience',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
  
  return routes;
}
