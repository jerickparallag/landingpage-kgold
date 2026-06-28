import { Navigate, useParams } from 'react-router-dom';
import { INTERNSHIPS_PAGE } from '../constants/content';
import { CareerDetailContent } from '../components/sections/careers/CareerDetailContent';
import { getInternshipById } from '../lib/careers';

export function CareersInternshipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const role = id ? getInternshipById(id) : undefined;

  if (!role) {
    return <Navigate to="/careers/internships" replace />;
  }

  return (
    <CareerDetailContent
      variant="internship"
      item={role}
      labels={{
        applyLabel: INTERNSHIPS_PAGE.applyLabel,
        highlightsLabel: INTERNSHIPS_PAGE.highlightsLabel,
        requirementsLabel: INTERNSHIPS_PAGE.requirementsLabel!,
      }}
    />
  );
}
