"use client";

import { useState, useEffect, useRef } from "react";
import { useUsers } from "../../context/UserContext";
import { useDebounce } from "../../hooks/useDebounce";
import { Searching } from "../Searching/Searching";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  const { setSearchQuery } = useUsers();

  // Обновляем значение поиска в контексте после debounce
  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  // Устанавливаем фокус на поле ввода при монтировании компонента
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          className={styles.input}
          type='text'
          placeholder='Поиск пользователей...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            type='button'
            className={styles.clearButton}
            onClick={() => {
              setInputValue("");
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
      </div>
      {inputValue !== debouncedValue && <Searching />}
    </div>
  );
}
