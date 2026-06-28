import { Navigate, useParams } from 'react-router-dom';
import { JOBS_PAGE } from '../constants/content';
import { CareerDetailContent } from '../components/sections/careers/CareerDetailContent';
import { getJobById } from '../lib/careers';

export function CareersJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const job = id ? getJobById(id) : undefined;

  if (!job) {
    return <Navigate to="/careers/jobs" replace />;
  }

  return (
    <CareerDetailContent
      variant="job"
      item={job}
      labels={{
        applyLabel: JOBS_PAGE.applyLabel,
        responsibilitiesLabel: JOBS_PAGE.responsibilitiesLabel,
        requirementsLabel: JOBS_PAGE.requirementsLabel!,
      }}
    />
  );
}
