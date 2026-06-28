import { cn } from '../../../lib/utils';

interface ICareersDepartmentNavProps {
  departments: readonly string[];
  selectedDepartment: string | null;
  onSelect: (department: string | null) => void;
  filterAllLabel: string;
}

export function CareersDepartmentNav({
  departments,
  selectedDepartment,
  onSelect,
  filterAllLabel,
}: ICareersDepartmentNavProps) {
  return (
    <nav className="careers-filter-nav scrollbar-none" aria-label="Filter by team">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn('careers-text-link', selectedDepartment === null && 'careers-text-link-active')}
      >
        {filterAllLabel}
      </button>
      {departments.map((department) => (
        <button
          key={department}
          type="button"
          onClick={() => onSelect(department)}
          className={cn(
            'careers-text-link',
            selectedDepartment === department && 'careers-text-link-active',
          )}
        >
          {department}
        </button>
      ))}
    </nav>
  );
}
