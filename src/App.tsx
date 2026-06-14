import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { Home } from '@/pages/Home';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { DMCA } from '@/pages/DMCA';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
        <Toaster position="top-center" richColors closeButton />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/dmca" element={<DMCA />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
        <ConsentBanner />
      </div>
    </Router>
  );
}

export default App;
