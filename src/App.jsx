import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Fitting from './pages/Fitting';
import Membership from './pages/Membership';
import About from './pages/About';
import Location from './pages/Location';
import Book from './pages/Book';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import CookieConsent from './components/CookieConsent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/lessons"    element={<Lessons />} />
            <Route path="/fitting"    element={<Fitting />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/about"      element={<About />} />
            <Route path="/location"   element={<Location />} />
            <Route path="/book"       element={<Book />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms"      element={<Terms />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
