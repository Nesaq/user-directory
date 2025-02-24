# Next.js User Directory

Это небольшое приложение на Next.js с использованием TypeScript, которое отображает список пользователей и их детальную информацию.

## Функционал

- Отображение списка пользователей из [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)
- Поиск пользователей по имени
- Пагинация списка пользователей
- Просмотр детальной информации о пользователе при клике
- SSR
- Управление состоянием через Context API
- Реализованы отдельные страницы юзеров по динамическому роутингу через ISR

## Технологии

- Next.js 15.1.7 (хотя у заказчика используется Next 13.5.4, после небольшого ресерча выяснил, что кардинальных отличий нет — напротив, фичи из версии 13 в 15 стали полноценными и стабильными)
- TypeScript
- CSS Modules для стилизации
- Context API для управления состоянием
- Server-Side Rendering (SSR/ISR)
- Routing на ISR. Выбор ISR обусловен тем, что у нас:
  1.  Отсутствует персонализация контента для каждого пользователя
  2.  Нет функционала зависящего от cookies/headers
  3.  Страницы профилей публичны и стабильные
- `generateMetadata` для динамического вычисления заголовка страницы из сегментов маршрута
- Если бы данные были очень динамичными или требовалась плотная интерактивность с момента загрузки, можно было бы рассмотреть вариант клиентского фетчинга (React query) или гибридного подхода (например, статическая генерация + клиентская актуализация данных). Но в этом случае, исходя из требований (публичные, стабильные данные) и отсутствия элементарной персонализации, выбранный подход с SSR/ISR является оптимальным.

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите приложение в режиме разработки:

```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Структура проекта

```
src/
  ├── app/                 # Основные компоненты страниц
   ├── profiles/           # Динамические роутинги
  ├── components/          # Переиспользуемые компоненты
  ├── context/            # Context API для управления состоянием
  └── types/              # TypeScript типы и интерфейсы
```

## Особенности реализации

- Использование CSS Modules для изолированных стилей компонентов
- Типизация данных с помощью TypeScript
- Обработка ошибок при загрузке данных
- Оптимизированная производительность благодаря SSR
- Dynamic routes
- **Пагинация:**  
  Реализована минимально жизнеспособная пагинация, имитирующая фетчинг данных через серверное кеширование. Поскольку API не поддерживает разбивку данных на страницы, использована логика расчёта параметров (`_start` и `_limit`) для отдачи по 4 пользователя за раз.
  Если бы требовалась высокая интерактивность и динамичное обновление данных, React Query был бы моим выбором :D

## Сборка для продакшена

```bash
npm run build
npm start
```
