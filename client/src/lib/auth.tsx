import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { apiRequest } from "./queryClient";

interface RepUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "rep";
  status: string;
  verticals: string;
  avatarColor: string;
  createdAt: string;
}

interface AuthContextType {
  user: RepUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RepUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    try {
      const saved = window.__tfAuth;
      if (saved) {
        setUser(saved);
      }
    } catch {}
    setIsLoading(false);
  }, []);

  async function login(email: string, pin: string) {
    try {
      const res = await apiRequest("POST", "/api/auth/login", { email, pin });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data);
      // Store in window (no localStorage in sandbox)
      (window as any).__tfAuth = data;
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  function logout() {
    setUser(null);
    delete (window as any).__tfAuth;
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === "admin", isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Add type to window
declare global {
  interface Window {
    __tfAuth?: RepUser;
  }
}
