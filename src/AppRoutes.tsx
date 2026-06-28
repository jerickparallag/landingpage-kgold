import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { CareersJobsPage } from './pages/CareersJobsPage';
import { CareersJobDetailPage } from './pages/CareersJobDetailPage';
import { CareersInternshipsPage } from './pages/CareersInternshipsPage';
import { CareersInternshipDetailPage } from './pages/CareersInternshipDetailPage';
import { CollectionPage } from './pages/CollectionPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { JournalPage } from './pages/JournalPage';
import { JournalArticlePage } from './pages/JournalArticlePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/:slug" element={<CollectionPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/journal/:slug" element={<JournalArticlePage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/careers/jobs" element={<CareersJobsPage />} />
      <Route path="/careers/jobs/:id" element={<CareersJobDetailPage />} />
      <Route path="/careers/internships" element={<CareersInternshipsPage />} />
      <Route path="/careers/internships/:id" element={<CareersInternshipDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about/contact" element={<Navigate to="/contact" replace />} />
    </Routes>
  );
}
