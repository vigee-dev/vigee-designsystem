'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SideArrowProps {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
  /** Title of the neighbour document, shown below the arrow. */
  label: string | null;
  ariaLabel: string;
}

export function SideArrow({
  direction,
  disabled,
  onClick,
  label,
  ariaLabel,
}: SideArrowProps) {
  return (
    <div
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-2',
        direction === 'left' ? 'left-6' : 'right-6',
        'transition-opacity duration-200',
        disabled && 'opacity-0 pointer-events-none'
      )}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          'w-16 h-16 rounded-full',
          'bg-white border border-gray-200 shadow-xl',
          'flex items-center justify-center text-gray-700',
          'hover:bg-primary hover:text-white hover:scale-110 hover:shadow-2xl hover:border-primary',
          'transition-all duration-200'
        )}
      >
        {direction === 'left' ? (
          <ChevronLeft className="w-7 h-7" strokeWidth={2.5} />
        ) : (
          <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
        )}
      </button>
      {label && (
        <span
          className="max-w-[160px] truncate text-xs text-slate-400 text-center"
          title={label}
        >
          {label}
        </span>
      )}
    </div>
  );
}
