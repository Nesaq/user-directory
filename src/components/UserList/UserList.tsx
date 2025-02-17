"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUsers } from "../../context/UserContext";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import type { User } from "@/types/user";
import styles from "./UserList.module.css";

type UserListProps = {
  users: User[];
  currentPage: number;
  limit: number;
};

export function UserList({ users, currentPage, limit }: UserListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const { searchQuery, selectedUser, setSelectedUser } = useUsers();

  useEffect(() => {
    setIsNavigating(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("page")]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (users.length === 0) {
    return (
      <ErrorMessage message='Не удалось загрузить список пользователей. Пожалуйста, попробуйте позже.' />
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>Пользователи не найдены</p>
      </div>
    );
  }

  // Функция для обработки изменения страницы пагинации.
  // При вызове устанавливается флаг isNavigating для отключения кнопок,
  // а затем роутер переходит на URL с обновленным параметром страницы.
  const handlePageChange = (page: number) => {
    setIsNavigating(true);
    router.push(`/?page=${page}`);
  };

  return (
    <div
      className={`${styles.userList} ${isNavigating ? styles.navigating : ""}`}
    >
      <div className={styles.cardsContainer}>
        {filteredUsers.map((user) => {
          const isSelected = selectedUser && selectedUser.id === user.id;
          return (
            <div
              key={user.id}
              className={`${styles.userCard} ${isSelected ? styles.selected : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          );
        })}
      </div>
      <nav className={styles.pagination}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={styles.pageButton}
            disabled={isNavigating}
          >
            Предыдущая
          </button>
        )}
        <span>Страница {currentPage}</span>
        {users.length === limit && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={styles.pageButton}
            disabled={isNavigating}
          >
            Следующая
          </button>
        )}
      </nav>
    </div>
  );
}
