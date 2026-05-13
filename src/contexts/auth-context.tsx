import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "student" | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  grade?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    if (email.includes("anna")) {
      setUser({
        id: "anna",
        name: "Anna Pierre",
        role: "admin",
      });
    } else if (email.includes("olivier")) {
      setUser({
        id: "olivier",
        name: "Olivier",
        role: "student",
        grade: "8th",
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
