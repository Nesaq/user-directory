import { UserProvider } from "../context/UserContext";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { UserDetails } from "../components/UserDetails/UserDetails";
import styles from "./page.module.css";
import { User } from "../types/user";
import { UserList } from "../components/UserList/UserList";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Функция получения страницы пользователей с пагинацией
async function getUsersPage(
  page: number = 1,
  limit: number = 4
): Promise<User[]> {
  const start = (page - 1) * limit;
  const res = await fetch(`${API_URL}?_start=${start}&_limit=${limit}`, {
    // Настройка SSR/ISR – кэшируем результат и обновляем его каждые 3600 секунд
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  // Если searchParams является промисом, нужно его дождаться
  searchParams: Promise<{ page?: string }>;
}) {
  // Ждём, пока searchParams будет разрешён, и извлекаем параметры
  const resolvedSearchParams = await searchParams;
  // Определяем номер страницы (если не указан, берём 1)
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const limit = 4; // Количество пользователей на странице
  const users = await getUsersPage(currentPage, limit);

  return (
    <UserProvider initialUsers={users}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            <SearchBar />
            <UserList users={users} currentPage={currentPage} limit={limit} />
          </div>
          <div className={styles.rightPanel}>
            <UserDetails />
          </div>
        </div>
      </main>
    </UserProvider>
  );
}
