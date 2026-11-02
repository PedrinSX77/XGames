import { useEffect, useState } from "react";
import { type User } from "../types/type";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  function login(userData: User) {
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
