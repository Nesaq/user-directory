"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // Логируем ошибку в консоль
  useEffect(() => {
    console.error("Произошла ошибка:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Что-то пошло не так!</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Попробовать снова</button>
        </div>
      </body>
    </html>
  );
}
