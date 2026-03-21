import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllSubsidies,
  getSubsidyById,
  getSubsidiesByCategory,
  getCategoryById,
  getStatusLabel,
  getStatusColor,
} from '@/lib/subsidies';
import SubsidyCard from '@/components/SubsidyCard';

const categoryRecommendations: Record<string, Array<{ title: string; description: string; cta: string; url: string; tag: string }>> = {
  housing: [
    { title: '房貸利率比較', description: '比較各銀行最新房貸利率，找到最划算的方案', cta: '立即比較', url: 'https://www.money101.com.tw/mortgage', tag: '房貸' },
    { title: '租屋找房', description: '591 租屋網找到理想住處', cta: '開始找房', url: 'https://rent.591.com.tw', tag: '租屋' },
  ],
  parenting: [
    { title: '嬰幼兒保險比較', description: '幫寶寶選擇合適的保險方案', cta: '了解方案', url: 'https://www.money101.com.tw/insurance', tag: '保險' },
    { title: '親子用品優惠', description: 'momo 親子館限時優惠', cta: '查看優惠', url: 'https://www.momoshop.com.tw', tag: '購物' },
  ],
  energy: [
    { title: '節能家電比價', description: '一級能效冷氣、冰箱最低價比較', cta: '比價去', url: 'https://www.momoshop.com.tw', tag: '家電' },
    { title: '電動機車優惠', description: 'Gogoro 最新購車方案', cta: '查看方案', url: 'https://www.gogoro.com', tag: '電動車' },
  ],
  employment: [
    { title: '履歷健檢', description: 'AI 幫你優化履歷，提升面試機會', cta: '免費試用', url: 'https://www.104.com.tw', tag: '求職' },
    { title: '線上課程', description: 'Hahow 熱門職場技能課程', cta: '探索課程', url: 'https://hahow.in', tag: '進修' },
  ],
  healthcare: [
    { title: '醫療險比較', description: '找到適合的醫療保險方案', cta: '比較方案', url: 'https://www.money101.com.tw/insurance', tag: '保險' },
  ],
  education: [
    { title: '線上學習平台', description: '多種免費和付費課程可選', cta: '開始學習', url: 'https://hahow.in', tag: '學習' },
  ],
  elderly: [
    { title: '長照保險', description: '及早規劃長照保險', cta: '了解方案', url: 'https://www.money101.com.tw/insurance', tag: '保險' },
  ],
  travel: [
    { title: '住宿比價', description: 'Agoda 國內旅宿最低價', cta: '搜尋住宿', url: 'https://www.agoda.com/zh-tw', tag: '旅遊' },
  ],
  welfare: [
    { title: '理財規劃', description: '免費理財諮詢服務', cta: '預約諮詢', url: 'https://www.money101.com.tw', tag: '理財' },
  ],
};

export function generateStaticParams() {
  return getAllSubsidies().map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const subsidy = getSubsidyById(id);
  if (!subsidy) return { title: '找不到此補助' };

  return {
    title: `${subsidy.name} — 申請資格、金額、方式`,
    description: `${subsidy.summary}。金額：${subsidy.amount}。主管機關：${subsidy.ministry}。了解申請資格與步驟。`,
    keywords: subsidy.tags,
    openGraph: {
      title: `${subsidy.name} | 補助通`,
      description: subsidy.summary,
      type: 'article',
      locale: 'zh_TW',
    },
  };
}

export default async function SubsidyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subsidy = getSubsidyById(id);
  if (!subsidy) notFound();

  const category = getCategoryById(subsidy.category);
  const relatedSubsidies = getSubsidiesByCategory(subsidy.category)
    .filter((s) => s.id !== subsidy.id)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: subsidy.name,
    description: subsidy.summary,
    provider: {
      '@type': 'GovernmentOrganization',
      name: subsidy.ministry,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Taiwan',
    },
    serviceType: 'Government Subsidy',
    url: subsidy.applyUrl,
  };

  // Build FAQ structured data from subsidy fields
  const faqEntries: { name: string; text: string }[] = [];

  // Q1: Eligibility
  const eligibilityAnswer = [
    subsidy.eligibility.description,
    ...subsidy.eligibility.conditions.map((c, i) => `${i + 1}. ${c}`),
  ].join('\n');
  faqEntries.push({
    name: `${subsidy.name}的申請資格是什麼？`,
    text: eligibilityAnswer,
  });

  // Q2: Amount + highlights
  const amountParts = [subsidy.amount];
  if (subsidy.highlights.length > 0) {
    amountParts.push(...subsidy.highlights);
  }
  faqEntries.push({
    name: `${subsidy.name}的補助金額是多少？`,
    text: amountParts.join('。'),
  });

  // Q3: How to apply
  const applyAnswer = subsidy.howToApply
    .map((step, i) => `步驟${i + 1}：${step}`)
    .join('\n');
  faqEntries.push({
    name: `${subsidy.name}要怎麼申請？`,
    text: applyAnswer,
  });

  // Q4: Deadline
  faqEntries.push({
    name: `${subsidy.name}的申請截止日是什麼時候？`,
    text: `${subsidy.name}的申請截止日為${subsidy.deadline}。請留意截止時間，以免錯過申請機會。`,
  });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map((q) => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.text,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-slate-200 transition-colors">首頁</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.id}`} className="hover:text-gray-700 dark:hover:text-slate-200 transition-colors">
                {category.icon} {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 dark:text-slate-100 font-medium">{subsidy.name}</span>
        </nav>

        {/* Hero section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{subsidy.icon}</span>
            <div className="flex-grow">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100">{subsidy.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subsidy.status)}`}>
                  {getStatusLabel(subsidy.status)}
                </span>
              </div>
              <p className="text-gray-500 dark:text-slate-400">{subsidy.ministry}</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed">{subsidy.summary}</p>
        </div>

        {/* Key info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40">
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mb-1">💰 補助金額</p>
            <p className="text-amber-900 dark:text-amber-200 font-bold text-base">{subsidy.amount}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40">
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">📅 申請截止</p>
            <p className="text-blue-900 dark:text-blue-200 font-bold text-base">{subsidy.deadline}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-100 dark:border-purple-800/40">
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">🏛️ 主管機關</p>
            <p className="text-purple-900 dark:text-purple-200 font-bold text-base">{subsidy.ministry}</p>
          </div>
        </div>

        {/* Highlights */}
        {subsidy.highlights.length > 0 && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/40 mb-6">
            <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-3">重點摘要</h2>
            <ul className="space-y-2">
              {subsidy.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-indigo-800 dark:text-indigo-300">
                  <span className="text-indigo-500 dark:text-indigo-400 mt-0.5">&#10003;</span>
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Eligibility */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">申請資格</h2>
          <p className="text-gray-600 dark:text-slate-300 mb-4">{subsidy.eligibility.description}</p>
          <ul className="space-y-3">
            {subsidy.eligibility.conditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-300 dark:border-slate-600 mt-0.5 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-slate-300 text-sm">{cond}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to apply */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">申請步驟</h2>
          <ol className="space-y-4">
            {subsidy.howToApply.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-slate-300 text-sm pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Apply CTA */}
        <div className="text-center mb-10">
          <a
            href={subsidy.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors text-lg shadow-lg"
          >
            前往申請
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-gray-400 dark:text-slate-500 text-xs mt-2">將前往官方申請網站</p>
        </div>

        {/* Related Recommendations */}
        {categoryRecommendations[subsidy.category] && (
          <div className="mb-10">
            <div className="mb-3">
              <h2 className="text-base font-semibold text-gray-700 dark:text-slate-300 inline">
                💡 相關推薦
              </h2>
              <span className="text-xs text-gray-400 dark:text-slate-500 ml-2">
                (本站可能從推薦連結獲得佣金，不影響您的費用)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryRecommendations[subsidy.category].map((rec, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/60 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                        {rec.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                        {rec.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-3">
                      {rec.description}
                    </p>
                  </div>
                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener sponsored"
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors self-start"
                  >
                    {rec.cta}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {subsidy.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related subsidies */}
        {relatedSubsidies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">同類別的其他補助</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedSubsidies.map((s) => (
                <SubsidyCard key={s.id} subsidy={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
