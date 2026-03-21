import type { MetadataRoute } from 'next';
import { getAllSubsidies, getCategories } from '@/lib/subsidies';
import { siteConfig } from '@/data/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const subsidies = getAllSubsidies();
  const categories = getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/subsidies`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const subsidyPages: MetadataRoute.Sitemap = subsidies.map((s) => ({
    url: `${baseUrl}/subsidy/${s.id}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...subsidyPages];
}
