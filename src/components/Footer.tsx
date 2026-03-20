import Link from 'next/link';
import { getCategories, getLastUpdated } from '@/lib/subsidies';

export default function Footer() {
  const categories = getCategories();
  const lastUpdated = getLastUpdated();

  return (
    <footer className="bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-slate-100 mb-3">
              <span className="text-xl">🇹🇼</span>
              <span>補助通</span>
            </Link>
            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
              台灣政府補助資訊整合平台，幫助民眾快速查找適合的補助方案。
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">補助分類</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 text-sm transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/subsidies" className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 text-sm transition-colors">
                  所有補助
                </Link>
              </li>
              <li>
                <a
                  href="https://www.gov.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 text-sm transition-colors"
                >
                  我的E政府
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-700">
          <p className="text-gray-400 dark:text-slate-500 text-xs leading-relaxed text-center">
            ⚠️ 本站資料僅供參考，實際申請資格、金額及辦法以各主管機關公告為準。
            本站非政府官方網站，如有疑問請洽各補助方案之主管機關。
          </p>
          <p className="text-gray-400 dark:text-slate-500 text-xs text-center mt-3">
            資料最後更新：{lastUpdated} &middot; &copy; {new Date().getFullYear()} 補助通 SubsidyTW
          </p>
        </div>
      </div>
    </footer>
  );
}
