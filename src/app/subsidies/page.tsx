import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: '所有補助方案',
  description: '瀏覽台灣所有政府補助方案，支援關鍵字搜尋、分類篩選及申請狀態篩選，快速找到適合你的補助。',
};

export default function SubsidiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">所有補助方案</h1>
        <p className="text-gray-500 dark:text-slate-400">搜尋或篩選，找到你能申請的政府補助</p>
      </div>
      <SearchBar showFilters={true} />
    </div>
  );
}
