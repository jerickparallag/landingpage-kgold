import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutLayout } from './components/layout/AboutLayout';
import { CareersLayout } from './components/layout/CareersLayout';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { CollectionPage } from './pages/CollectionPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop/:slug" element={<CollectionPage />} />
      <Route path="/about" element={<AboutLayout />}>
        <Route index element={<AboutPage />} />
      </Route>
      <Route path="/careers" element={<CareersLayout />}>
        <Route index element={<CareersPage />} />
      </Route>
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about/contact" element={<Navigate to="/contact" replace />} />
    </Routes>
  );
}
