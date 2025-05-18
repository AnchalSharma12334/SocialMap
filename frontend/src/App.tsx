import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StudiosPage from './pages/StudiosPage';
import StudioDetailPage from './pages/StudioDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Snackbar from './components/Snackbar';
import Bookings from './pages/Bookings';
import PaymentStatusPage from '../src/pages/PaymentStatusPage'; // ✅ Import added

const Router: React.FC = () => {
  const { currentPath, snackbar, hideSnackbar } = useApp();
  
  // Render the appropriate page based on the current path
  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage />;
    } else if (currentPath === '/studios') {
      return <StudiosPage />;
    } else if (currentPath.startsWith('/studios/')) {
      return <StudioDetailPage />;
    } else if (currentPath === '/login') {
      return <LoginPage />;
    } else if (currentPath === '/signup') {
      return <SignupPage />;
    } else if (currentPath === '/profile') {
      return <ProfilePage />;
    } else if (currentPath === '/about') {
      return <AboutPage />;
    } else if (currentPath === '/contact') {
      return <ContactPage />;
    } else if (currentPath === '/bookings') {
      return <Bookings />;
    } else if (currentPath.startsWith('/payment-status')) {  // ✅ Route added
      return <PaymentStatusPage />;
    } else {
      // Default to home page if path is not recognized
      return <HomePage />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={hideSnackbar}
      />
    </div>
  );
};

function App() {
  useEffect(() => {
    document.title = 'SocialMap - Book Studios in Delhi';
  }, []);
  
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
