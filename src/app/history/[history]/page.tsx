import { Metadata } from "next"
import History from "./History"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "History",
  description: "Страница историии транзакций",
}
  
interface HistoryPageProps {
  params: Promise<{
    history: string
  }>
}

const allowedRoutes = ["income", "expense"]

export default async function HistoryPage({ params }: HistoryPageProps) {

  const resolvedParams = await params

  if(!allowedRoutes.includes(resolvedParams.history)) {
    notFound()
  }

  return (
    <>
    <History history={resolvedParams.history}/>
    </>
  )
}