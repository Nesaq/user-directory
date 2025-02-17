import { ReactNode } from "react";

export default function ProfilesLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header style={{ padding: "2rem", backgroundColor: "#000" }}>
        <h1>Профили пользователей</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
