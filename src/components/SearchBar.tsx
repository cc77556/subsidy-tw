'use client';

import { useState, useMemo } from 'react';
import { type Subsidy, type Category, getAllSubsidies, getCategories } from '@/lib/subsidies';
import SubsidyCard from './SubsidyCard';

interface SearchBarProps {
  initialSubsidies?: Subsidy[];
  showFilters?: boolean;
}

export default function SearchBar({ initialSubsidies, showFilters = true }: SearchBarProps) {
  const allSubsidies = initialSubsidies ?? getAllSubsidies();
  const categories: Category[] = getCategories();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const filteredSubsidies = useMemo(() => {
    let results = allSubsidies;

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

    if (selectedCategory) {
      results = results.filter((s) => s.category === selectedCategory);
    }

    if (selectedStatus) {
      results = results.filter((s) => s.status === selectedStatus);
    }

    return results;
  }, [allSubsidies, query, selectedCategory, selectedStatus]);

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜尋補助名稱、關鍵字、主管機關..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Category filters */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">分類篩選</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: cat.color } : undefined}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Status filters */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">申請狀態</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus('')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === ''
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setSelectedStatus(selectedStatus === 'open' ? '' : 'open')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'open'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                申請中
              </button>
              <button
                onClick={() => setSelectedStatus(selectedStatus === 'upcoming' ? '' : 'upcoming')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                即將開放
              </button>
              <button
                onClick={() => setSelectedStatus(selectedStatus === 'closed' ? '' : 'closed')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'closed'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                已截止
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
        共找到 <span className="font-semibold text-gray-700 dark:text-slate-200">{filteredSubsidies.length}</span> 項補助
      </p>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubsidies.map((subsidy) => (
          <SubsidyCard key={subsidy.id} subsidy={subsidy} />
        ))}
      </div>

      {filteredSubsidies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 dark:text-slate-400 text-lg">找不到符合條件的補助方案</p>
          <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">試試其他關鍵字或清除篩選條件</p>
        </div>
      )}
    </div>
  );
}
