import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '隱私權政策',
  description:
    '補助通 SubsidyTW 隱私權政策，說明本站如何處理使用者資料、Cookie 使用及第三方連結相關事項。',
  openGraph: {
    title: '隱私權政策 | 補助通',
    description: '補助通 SubsidyTW 隱私權政策',
    type: 'website',
    locale: 'zh_TW',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-6">
        <Link
          href="/"
          className="hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
        >
          首頁
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-slate-100 font-medium">
          隱私權政策
        </span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-8">
        隱私權政策
      </h1>

      <div className="space-y-8">
        {/* 網站名稱 */}
        <section>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            歡迎使用<strong>補助通 SubsidyTW</strong>
            （以下簡稱「本站」）。本隱私權政策說明本站如何處理使用者資料及相關事項。
          </p>
        </section>

        {/* 資料收集 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            資料收集
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站不收集個人資料，不需要註冊或登入即可使用所有功能。
          </p>
        </section>

        {/* Cookie */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            Cookie 與本地儲存
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-slate-300 leading-relaxed">
            <li>
              本站未來可能使用 Google Analytics
              cookie，以匿名方式分析網站流量與使用情況。
            </li>
            <li>
              使用者的暗色模式偏好設定儲存於瀏覽器的
              localStorage，不會傳送至任何伺服器。
            </li>
          </ul>
        </section>

        {/* 第三方連結 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            第三方連結
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站包含外部連結（如政府網站、合作夥伴等），點擊後離開本站即適用該網站的隱私權政策。本站對外部網站的內容及隱私措施不負責任。
          </p>
        </section>

        {/* 廣告 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            廣告
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站未來可能使用 Google AdSense
            展示廣告。屆時廣告服務商可能會使用 cookie
            根據使用者的瀏覽紀錄提供相關廣告。
          </p>
        </section>

        {/* 聯盟行銷 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            聯盟行銷揭露
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站部分連結為推薦連結（聯盟行銷連結），透過這些連結使用服務，本站可能獲得佣金，但不影響使用者的費用。我們僅推薦與補助主題相關且對使用者有幫助的產品與服務。
          </p>
        </section>

        {/* 資料來源 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            資料來源
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站所有補助資訊來自政府公開資料，僅供參考。我們會盡力確保資訊的正確性與時效性，但無法保證所有資料完全正確。
          </p>
        </section>

        {/* 免責聲明 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            免責聲明
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            實際補助申請資格、金額及辦法以各主管機關公告為準。本站不對因使用本站資訊而產生的任何損失承擔責任。
          </p>
        </section>

        {/* 政策更新 */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
            政策更新
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            本站保留隨時修改本隱私權政策的權利。修改後的政策將於本頁面公佈。
          </p>
        </section>

        {/* 最後更新 */}
        <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
          <p className="text-gray-400 dark:text-slate-500 text-sm">
            最後更新日期：2026 年 3 月 21 日
          </p>
        </div>
      </div>
    </div>
  );
}
