import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from '../components/Link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, navigateTo, authError, isLoading, clearAuthError } = useApp();
  
  // Clear any auth errors when component mounts or unmounts
  useEffect(() => {
    clearAuthError();
    return () => clearAuthError();
  }, [clearAuthError]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Call the login function from context that now connects to our backend API
      const success = await login(email, password);
      
      // Only navigate if login was successful
      if (success) {
        navigateTo('/');
      }
      // If not successful, the error will be shown on this page via authError
    } catch (error) {
      // Error handling is managed in the context
      console.error('Login submission error:', error);
      // Stay on login page to show the error
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle();
      
      // Only navigate if login was successful
      if (success) {
        navigateTo('/');
      }
      // If not successful, the error will be shown on this page
    } catch (error) {
      console.error('Google login error:', error);
      // Stay on login page to show the error
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#FF5A5F]">SocialMap</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-[#FF5A5F] hover:text-[#FF4045]">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {authError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {authError}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F] sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#FF5A5F] focus:border-[#FF5A5F] sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#FF5A5F] focus:ring-[#FF5A5F] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-[#FF5A5F] hover:text-[#FF4045]">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF4045] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54L20.0303 3.11C17.9553 1.19 15.2353 0 12.0003 0C7.31033 0 3.25533 2.69 1.28833 6.61L5.27033 9.61C6.29333 6.82 8.91033 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      fillRule="evenodd"
                      d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.33 17.24 16.07 18.09L19.93 21.14C22.19 19 23.49 15.92 23.49 12.27Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5.26998 14.2899C5.02998 13.5699 4.89998 12.7999 4.89998 11.9999C4.89998 11.1999 5.02998 10.4299 5.26998 9.7099L1.28798 6.7099C0.470983 8.3299 0.00698297 10.1299 0.00698297 11.9999C0.00698297 13.8699 0.470983 15.6699 1.28798 17.2899L5.26998 14.2899Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12.0004 24C15.2354 24 17.9554 22.92 19.9304 21.14L16.0704 18.09C15.0004 18.82 13.6204 19.25 12.0004 19.25C8.91035 19.25 6.29335 17.18 5.27035 14.39L1.28835 17.39C3.25535 21.31 7.31035 24 12.0004 24Z"
                      fill="#34A853"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;