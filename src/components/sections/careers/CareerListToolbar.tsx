import type { ReactNode } from 'react';
import type { TJobViewMode } from '../../../lib/careers';
import { cn } from '../../../lib/utils';

export interface ICareerListToolbarLabels {
  searchPlaceholder: string;
  filterAll: string;
  resultsSingular: string;
  resultsPlural: string;
  viewGrid: string;
  viewList: string;
}

interface ICareerListToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  departments: string[];
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
  viewMode: TJobViewMode;
  onViewModeChange: (mode: TJobViewMode) => void;
  resultCount: number;
  labels: ICareerListToolbarLabels;
}

function ViewToggleButton({
  isActive,
  label,
  onClick,
  children,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-brand border transition',
        isActive
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-card text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  );
}

export function CareerListToolbar({
  searchQuery,
  onSearchChange,
  departments,
  selectedDepartment,
  onDepartmentChange,
  viewMode,
  onViewModeChange,
  resultCount,
  labels,
}: ICareerListToolbarProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative block min-w-0 flex-1">
          <span className="sr-only">{labels.searchPlaceholder}</span>
          <svg
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="h-12 w-full rounded-brand border border-border bg-card py-3 pr-4 pl-11 text-sm text-foreground shadow-[var(--shadow-xs)] outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
        </label>

        <div className="flex shrink-0 items-center gap-2">
          <ViewToggleButton
            isActive={viewMode === 'grid'}
            label={labels.viewGrid}
            onClick={() => onViewModeChange('grid')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
            </svg>
          </ViewToggleButton>
          <ViewToggleButton
            isActive={viewMode === 'list'}
            label={labels.viewList}
            onClick={() => onViewModeChange('list')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </ViewToggleButton>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onDepartmentChange(null)}
            className={cn(
              'rounded-brand px-4 py-2 text-sm font-medium transition',
              selectedDepartment === null
                ? 'bg-foreground text-background'
                : 'border border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {labels.filterAll}
          </button>
          {departments.map((department) => (
            <button
              key={department}
              type="button"
              onClick={() => onDepartmentChange(department)}
              className={cn(
                'rounded-brand px-4 py-2 text-sm font-medium transition',
                selectedDepartment === department
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {department}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? labels.resultsSingular : labels.resultsPlural}
        </p>
      </div>
    </div>
  );
}
