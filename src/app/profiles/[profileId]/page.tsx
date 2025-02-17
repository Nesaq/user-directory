import React from "react";
import { notFound } from "next/navigation";
import type { User } from "@/types/user";

type ProfilePageProps = {
  params: { profileId: string };
};

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Функция кеширования запроса на получение данных пользователя
/*
React.cache - это кэш для каждого запроса. 
Он запускается при запросе к определенному URL и исчезает после отправки HTML пользователю. 
На выходе получаем, что кэшированное значение не будет передано другим пользователям 
или тому же пользователю, если он обновит страницу.
*/
const cachedGetUserData = React.cache(async function getUserData(
  profileId: string
): Promise<User> {
  const res = await fetch(`${API_URL}/${profileId}`, {
    // ISR rendering:
    // - cache: "force-cache" гарантирует, что результат запроса к API будет кэширован
    // - next: { revalidate: 3600 } обновляет кэш каждую 1 час, чтобы данные были свежими
    cache: "force-cache",
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return await res.json();
});

// Генерация метаданных с использованием кешированной функции
export async function generateMetadata({
  params,
}: {
  params: { profileId: string };
}) {
  try {
    // согласно доке Next.js, params должны авейтиться
    const { profileId } = await params;
    const user = await cachedGetUserData(profileId);
    return {
      title: `${user.username}'s profile`,
    };
  } catch (error) {
    console.error(error);
    return { title: "Профиль не найден" };
  }
}

/**
 * Страница профиля пользователя
 * @param {ProfilePageProps} params - Параметры роута
 * @returns {Promise<JSX.Element>} Страница профиля
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  let user: User;
  try {
    // согласно доке Next.js, params должны авейтиться
    const { profileId } = await params;
    user = await cachedGetUserData(profileId);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!user || !user.id) notFound();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Профиль: {user.name}</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <div style={{ marginTop: "1rem" }}>
        <h2>Адрес:</h2>
        <p>
          {user.address.street}, {user.address.suite}
        </p>
        <p>
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h2>Компания:</h2>
        <p>
          <strong>{user.company.name}</strong>
        </p>
        <p>{user.company.catchPhrase}</p>
        <p>{user.company.bs}</p>
      </div>
    </div>
  );
}
