"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUsers } from "../../context/UserContext";
import { Spinner } from "../Spinner/Spinner";
import styles from "./UserDetails.module.css";

export function UserDetails() {
  const { selectedUser } = useUsers();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.noUser}>
        <Spinner />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className={styles.noUser}>
        <p>Выберите пользователя для просмотра деталей</p>
      </div>
    );
  }

  return (
    <div className={styles.userDetails}>
      <Link
        href={`/profiles/${selectedUser.id}`}
        className={styles.profileButton}
      >
        Посмотреть профиль
      </Link>
      <h2>{selectedUser.name}</h2>
      <div className={styles.info}>
        <p>
          <strong>Username:</strong> {selectedUser.username}
        </p>
        <p>
          <strong>Email:</strong> {selectedUser.email}
        </p>
        <p>
          <strong>Phone:</strong> {selectedUser.phone}
        </p>
        <p>
          <strong>Website:</strong> {selectedUser.website}
        </p>
      </div>

      <div className={styles.section}>
        <h3>Address:</h3>
        <p>
          {selectedUser.address.street}, {selectedUser.address.suite}
        </p>
        <p>
          {selectedUser.address.city}, {selectedUser.address.zipcode}
        </p>
      </div>

      <div className={styles.section}>
        <h3>Company:</h3>
        <p>
          <strong>{selectedUser.company.name}</strong>
        </p>
        <p>{selectedUser.company.catchPhrase}</p>
        <p>{selectedUser.company.bs}</p>
      </div>
    </div>
  );
}
