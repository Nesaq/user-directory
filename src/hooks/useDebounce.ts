import { useState, useEffect } from "react";

/**
 * Хук useDebounce принимает значение и задержку (в миллисекундах),
 * и возвращает дебаунсированное значение, которое обновляется с указанной задержкой.
 *
 * @param value - входное значение, изменения которого нужно "задебаунсить"
 * @param delay - задержка в миллисекундах (по умолчанию 300 мс)
 * @returns дебаунсированное значение
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Запускаем таймер, который обновит debouncedValue через delay мс
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // При изменении value или delay, либо при размонтировании компонента очищаем предыдущий таймер
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
