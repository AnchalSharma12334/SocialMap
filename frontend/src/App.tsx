import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AppProvider } from './context/AppContext';
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

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  useEffect(() => {
    document.title = 'SocialMap - Book Studios in Delhi';
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studios" element={<StudiosPage />} />
              <Route path="/studios/:id" element={<StudioDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Fallback route: redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
