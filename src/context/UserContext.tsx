"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User, UserContextType } from "../types/user";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUsers: User[];
}

export function UserProvider({ children, initialUsers }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, _setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        _setSelectedUser(userObj);
      } catch (error) {
        console.error(
          "Ошибка парсинга выбранного пользователя из localStorage",
          error
        );
      }
    }
  }, []);

  const setSelectedUser = (user: User | null) => {
    _setSelectedUser(user);
    if (user) {
      localStorage.setItem("selectedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("selectedUser");
    }
  };

  const value = {
    users,
    selectedUser,
    searchQuery,
    setUsers,
    setSelectedUser,
    setSearchQuery,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers должен использоваться внутри UserProvider");
  }
  return context;
}
