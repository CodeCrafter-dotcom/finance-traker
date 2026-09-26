'use client'

import Button from "@/app/components/ui/Button/Button"
import { useContextActions, useContextData } from "@/app/context/Context"
import Link from "next/link"

export default function Header() {

  const { deleteAllTransaction } = useContextActions()
  const { transaction } = useContextData()

  return(
    <header className="bg-white border-b border-gray-200">
      <div className="px-5 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
        📊
        Финансовый Трекер
        </Link>
        <Button 
        onClick={deleteAllTransaction}
        className="p-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm shadow-sm"
        title={transaction.length === 0 ? 'Список транзакций пуст' : ''}
        >
          Очистить историю транзакций
        </Button>
      </div>
    </header>
  )
}