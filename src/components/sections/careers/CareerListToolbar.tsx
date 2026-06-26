import { useRef, useState, type ReactNode } from 'react';
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

function FilterButton({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('luxury-nav-link', isSelected ? 'opacity-100' : 'opacity-70')}
    >
      {children}
    </button>
  );
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

function SearchIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const isSearchOpen = searchExpanded || searchQuery.length > 0;

  const openSearch = () => {
    setSearchExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeSearchIfEmpty = () => {
    if (!searchQuery) setSearchExpanded(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 sm:gap-3">
        {!isSearchOpen ? (
          <button
            type="button"
            onClick={openSearch}
            aria-label={labels.searchPlaceholder}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-brand border border-border bg-background text-muted-foreground transition hover:text-foreground"
          >
            <SearchIcon />
          </button>
        ) : (
          <label
            className={cn(
              'relative block w-48 shrink-0 transition-[width] duration-300 ease-out sm:w-60 md:w-72',
            )}
          >
            <span className="sr-only">{labels.searchPlaceholder}</span>
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              onBlur={closeSearchIfEmpty}
              placeholder={labels.searchPlaceholder}
              className="h-12 w-full rounded-brand border border-border bg-background py-3 pr-4 pl-11 text-sm font-light text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground/40"
            />
          </label>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-2">
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
        <div className="flex flex-wrap gap-6">
          <FilterButton isSelected={selectedDepartment === null} onClick={() => onDepartmentChange(null)}>
            {labels.filterAll}
          </FilterButton>
          {departments.map((department) => (
            <FilterButton
              key={department}
              isSelected={selectedDepartment === department}
              onClick={() => onDepartmentChange(department)}
            >
              {department}
            </FilterButton>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? labels.resultsSingular : labels.resultsPlural}
        </p>
      </div>
    </div>
  );
}
