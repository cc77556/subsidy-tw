export const siteConfig = {
  name: "補助通 SubsidyTW",
  title: "補助通 — 台灣政府補助查詢",
  description: "輸入你的條件，3秒找到所有能申請的政府補助。租屋補助、育兒津貼、節能補貼、就業獎勵，一站查到底。",
  url: "https://subsidy-tw.vercel.app",
  locale: "zh-TW",
  keywords: ["政府補助", "租屋補助", "育兒津貼", "節能補助", "生育給付", "補助查詢", "2026補助"],
  author: "SubsidyTW",
  ga4Id: "", // TODO: add GA4 measurement ID
}

export type Subsidy = {
  id: string
  name: string
  category: string
  icon: string
  ministry: string
  summary: string
  amount: string
  deadline: string
  status: "open" | "closed" | "upcoming"
  eligibility: {
    description: string
    conditions: string[]
  }
  howToApply: string[]
  applyUrl: string
  tags: string[]
  updatedAt: string
  highlights: string[]
}

export type Category = {
  id: string
  name: string
  icon: string
  color: string
  description: string
}
