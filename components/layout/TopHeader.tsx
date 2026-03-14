'use client';

import Link from 'next/link';
import { useUserStore, selectTotalXP } from '@/lib/store/userStore';
import { cn } from '@/lib/utils/cn';

export function TopHeader() {
  const totalXP = useUserStore(selectTotalXP);

  return (
    <header
      className={cn(
        'flex-shrink-0 relative z-10',
        'h-[var(--header-height)] bg-navy-600 flex items-center px-5 gap-3 shadow-sm'
      )}
    >
      <Link href="/" className="flex items-center gap-1 select-none">
        <span className="font-display text-[22px] font-bold text-white tracking-tight">Lingua</span>
        <span className="font-display text-[22px] font-bold text-brand-orange tracking-tight">Flow</span>
      </Link>
      <div className="flex-1" />
      <div className="font-code text-[11px] tracking-widest text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1">
        ⚡ {totalXP.toLocaleString()} XP
      </div>
    </header>
  );
}
