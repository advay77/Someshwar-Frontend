import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedRole = localStorage.getItem('adminRole');
    const storedUsername = localStorage.getItem('adminUsername');

    if (storedToken && storedRole === 'admin' && storedUsername) {
      setToken(storedToken);
      setUser({ username: storedUsername, role: storedRole });
      setIsAdmin(true);
    }
    setLoading(false); // Set loading to false after initial check
  }, []);

  const login = (newToken, newUsername, newRole) => {
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUsername', newUsername);
    localStorage.setItem('adminRole', newRole);
    setToken(newToken);
    setUser({ username: newUsername, role: newRole });
    setIsAdmin(newRole === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    navigate('/admin/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
