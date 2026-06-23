import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutLayout } from './components/layout/AboutLayout';
import { CareersLayout } from './components/layout/CareersLayout';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutLayout />}>
        <Route index element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/careers" element={<CareersLayout />}>
        <Route index element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/contact" element={<Navigate to="/about/contact" replace />} />
    </Routes>
  );
}
