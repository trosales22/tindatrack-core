import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import Cookies from 'js-cookie';
import { Role, ROLES } from 'constants/roles';
  
  interface AuthUser {
    firstName: string;
    lastName: string;
    role: string;
    formattedRole: string;
    isAuthenticated: boolean;
  }
  
  interface AuthContextType {
    user: AuthUser;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser>({
      firstName: '',
      lastName: '',
      role: '',
      formattedRole: '',
      isAuthenticated: false,
    });
  
    useEffect(() => {
      const firstName = Cookies.get('firstname') ?? '';
      const lastName = Cookies.get('lastname') ?? '';
      const role = (Cookies.get('role') as Role) ?? '';
      const roleMap: Record<string, string> = {
        [ROLES.SUPER_ADMIN]: 'Super Administrator',
        [ROLES.BUSINESS_ADMIN]: 'Business Admin',
      };
      const formattedRole = roleMap[role] || 'Unknown';
      const isAuthenticated = Cookies.get('auth_status') === 'authenticated';
  
      setUser({ firstName, lastName, role, formattedRole, isAuthenticated });
    }, []);
  
    return (
      <AuthContext.Provider value={{ user }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
  };
  
  export { AuthProvider, useAuth };
  