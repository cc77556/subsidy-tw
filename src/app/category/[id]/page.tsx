import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategories,
  getCategoryById,
  getSubsidiesByCategory,
} from '@/lib/subsidies';
import SubsidyCard from '@/components/SubsidyCard';

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return { title: '找不到此分類' };

  return {
    title: `${category.name}補助方案一覽`,
    description: `瀏覽所有「${category.name}」類別的台灣政府補助方案：${category.description}。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const subsidies = getSubsidiesByCategory(id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-6">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-slate-200 transition-colors">首頁</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-slate-100 font-medium">{category.icon} {category.name}</span>
      </nav>

      {/* Category header */}
      <div
        className="rounded-2xl p-8 mb-8 text-white"
        style={{ backgroundColor: category.color }}
      >
        <span className="text-5xl block mb-4">{category.icon}</span>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-white/80 text-lg">{category.description}</p>
        <p className="text-white/60 text-sm mt-2">共 {subsidies.length} 項補助方案</p>
      </div>

      {/* Subsidy list */}
      {subsidies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subsidies.map((subsidy) => (
            <SubsidyCard key={subsidy.id} subsidy={subsidy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-500 dark:text-slate-400 text-lg">此分類目前沒有補助方案</p>
        </div>
      )}
    </div>
  );
}
