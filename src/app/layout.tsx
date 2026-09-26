import type { Metadata } from "next";
import AppSetup from "./hooks/useTabNavigation/useTabNavigation";
import "./globals.css";
import { TaskProvider } from "./context/Context";

export const metadata: Metadata = {
  title: {
    default: 'Финансовый Трекер',
    template: 'Финансовый Трекер | %s'
  },
  description: "Простой учет расходов и доходов без сложных таблиц. Контролируйте свой бюджет в один тап, следите за тратами и копите на цели легко",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
    >
      <body>
        <TaskProvider>
          <AppSetup/>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
