import Link from 'next/link';
import { getAllSubsidies, getCategories, getLastUpdated } from '@/lib/subsidies';
import SubsidyCard from '@/components/SubsidyCard';

export default function HomePage() {
  const subsidies = getAllSubsidies();
  const categories = getCategories();
  const hotSubsidies = subsidies.filter((s) => s.status === 'open').slice(0, 6);
  const lastUpdated = getLastUpdated();

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            台灣政府補助，一站查到底
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            租屋補貼、育兒津貼、節能家電、就業獎勵...
            <br className="hidden sm:block" />
            快速找到你能申請的補助方案
          </p>
          <Link
            href="/subsidies"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-lg shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            開始查詢
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{subsidies.length}+</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm">收錄補助項目</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{categories.length}</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm">大類別</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{lastUpdated}</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm">最後更新</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">依分類瀏覽</h2>
          <p className="text-gray-500 dark:text-slate-400">選擇你感興趣的補助類別</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="card-hover bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 text-center"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">{cat.name}</h3>
              <p className="text-gray-500 dark:text-slate-400 text-xs">{cat.description}</p>
            </Link>
          ))}
          {/* "View all" card */}
          <Link
            href="/subsidies"
            className="card-hover bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800 p-5 text-center flex flex-col items-center justify-center"
          >
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">全部瀏覽</h3>
            <p className="text-indigo-500 dark:text-indigo-400 text-xs">查看所有補助方案</p>
          </Link>
        </div>
      </section>

      {/* Hot subsidies */}
      <section className="bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">熱門補助方案</h2>
            <p className="text-gray-500 dark:text-slate-400">現在就能申請的補助，別錯過了</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotSubsidies.map((subsidy) => (
              <SubsidyCard key={subsidy.id} subsidy={subsidy} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/subsidies"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              所有補助一覽
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
