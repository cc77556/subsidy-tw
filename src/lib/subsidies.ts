import subsidiesData from '@/data/subsidies.json';
import categoriesData from '@/data/categories.json';

export interface SubsidyEligibility {
  description: string;
  conditions: string[];
}

export interface Subsidy {
  id: string;
  name: string;
  category: string;
  icon: string;
  ministry: string;
  summary: string;
  amount: string;
  deadline: string;
  status: 'open' | 'closed' | 'upcoming';
  eligibility: SubsidyEligibility;
  howToApply: string[];
  applyUrl: string;
  tags: string[];
  updatedAt: string;
  highlights: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const subsidies: Subsidy[] = subsidiesData as Subsidy[];
const categories: Category[] = categoriesData as Category[];

export function getAllSubsidies(): Subsidy[] {
  return subsidies;
}

export function getSubsidyById(id: string): Subsidy | undefined {
  return subsidies.find((s) => s.id === id);
}

export function getSubsidiesByCategory(categoryId: string): Subsidy[] {
  return subsidies.filter((s) => s.category === categoryId);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function searchSubsidies(
  query: string,
  filters?: { category?: string; status?: string }
): Subsidy[] {
  let results = subsidies;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.ministry.toLowerCase().includes(q)
    );
  }

  if (filters?.category) {
    results = results.filter((s) => s.category === filters.category);
  }

  if (filters?.status) {
    results = results.filter((s) => s.status === filters.status);
  }

  return results;
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'open':
      return '申請中';
    case 'closed':
      return '已截止';
    case 'upcoming':
      return '即將開放';
    default:
      return status;
  }
}

export function getLastUpdated(): string {
  const dates = subsidies.map((s) => s.updatedAt).filter(Boolean).sort();
  return dates.length > 0 ? dates[dates.length - 1] : '—';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'closed':
      return 'bg-red-100 text-red-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
