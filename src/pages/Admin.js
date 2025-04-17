import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <AdminPanel />
          {/* Add Link to Admin Analytics Page */}
          <Link to="/admin/analytics">
            <button>View Admin Analytics</button>
          </Link>
        </div>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Admin;
