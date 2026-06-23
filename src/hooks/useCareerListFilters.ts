import { useMemo, useState } from 'react';
import type { TJobViewMode } from '../lib/careers';

export function useCareerListFilters<T extends { id: string; department: string }>(
  items: T[],
  filterFn: (items: readonly T[], query: string, department: string | null) => T[],
  getDepartments: (items: readonly T[]) => string[],
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<TJobViewMode>('grid');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const departments = useMemo(() => getDepartments(items), [items, getDepartments]);
  const filteredItems = useMemo(
    () => filterFn(items, searchQuery, selectedDepartment),
    [items, searchQuery, selectedDepartment, filterFn],
  );

  const toggleActiveItem = (id: string) => {
    setActiveItemId((current) => (current === id ? null : id));
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    viewMode,
    setViewMode,
    activeItemId,
    toggleActiveItem,
    departments,
    filteredItems,
  };
}
