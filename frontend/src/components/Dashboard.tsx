import React from 'react';

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // redirect to login
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to SocialMap Dashboard!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
