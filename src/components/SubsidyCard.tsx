import Link from 'next/link';
import { type Subsidy, type Category, getStatusLabel, getStatusColor, getCategoryById } from '@/lib/subsidies';

interface SubsidyCardProps {
  subsidy: Subsidy;
}

export default function SubsidyCard({ subsidy }: SubsidyCardProps) {
  const category: Category | undefined = getCategoryById(subsidy.category);
  const statusLabel = getStatusLabel(subsidy.status);
  const statusColor = getStatusColor(subsidy.status);

  return (
    <Link href={`/subsidy/${subsidy.id}`} className="block">
      <div className="card-hover bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 h-full flex flex-col">
        {/* Top row: icon + status */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{subsidy.icon}</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg mb-1 line-clamp-2">{subsidy.name}</h3>

        {/* Ministry */}
        <p className="text-gray-500 dark:text-slate-400 text-xs mb-2">{subsidy.ministry}</p>

        {/* Summary */}
        <p className="text-gray-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 flex-grow">{subsidy.summary}</p>

        {/* Amount */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg px-3 py-2 mb-3">
          <p className="text-amber-800 dark:text-amber-300 text-sm font-semibold line-clamp-1">
            💰 {subsidy.amount}
          </p>
        </div>

        {/* Bottom: category + deadline */}
        <div className="flex items-center justify-between text-xs">
          {category && (
            <span
              className="inline-flex items-center px-2 py-1 rounded-md font-medium text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.icon} {category.name}
            </span>
          )}
          <span className="text-gray-400 dark:text-slate-500">
            截止：{subsidy.deadline}
          </span>
        </div>
      </div>
    </Link>
  );
}
