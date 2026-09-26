import { Metadata } from "next";
import Header from "../layout/Header/Header";
import Main from "../layout/Main/Main";
import FinanceTracker from "../components/FinanceTraker/FinanceTraker";

export const metadata: Metadata = {
  title: "Home",
  description: "Легкий финансовый трекер для контроля расходов и доходов. Управляйте личным бюджетом без сложных таблиц и стресса. Начните вести учет денег бесплатно",
}

export default function Home() {
  return (
    <>
    <Header/>
    <Main>
      <FinanceTracker/>
    </Main>
    </>
  )
}
