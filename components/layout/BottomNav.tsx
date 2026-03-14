'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { href: '/',          label: 'Home',   emoji: '🏠' },
  { href: '/reading',   label: 'Read',   emoji: '📖' },
  { href: '/writing',   label: 'Write',  emoji: '✍️' },
  { href: '/listening', label: 'Listen', emoji: '🎧' },
  { href: '/speaking',  label: 'Speak',  emoji: '🎤' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="h-[var(--nav-height)] bg-white border-t border-brand-cream-2 flex items-stretch flex-shrink-0 z-10 shadow-[0_-4px_20px_rgba(26,39,68,.08)]">
      {NAV_ITEMS.map(({ href, label, emoji }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 relative',
              'transition-colors duration-200 select-none',
              'text-[11px] font-semibold tracking-[0.5px] font-body min-h-[44px]',
              isActive ? 'text-navy-600' : 'text-muted-foreground'
            )}
          >
            <span
              className={cn(
                'absolute top-0 left-[20%] right-[20%] h-[3px] rounded-b-sm transition-all duration-200',
                isActive ? 'bg-brand-orange' : 'bg-transparent'
              )}
            />
            <span
              className={cn('text-[20px] transition-transform duration-200', isActive && '-translate-y-0.5')}
              role="img"
              aria-label={label}
            >
              {emoji}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
