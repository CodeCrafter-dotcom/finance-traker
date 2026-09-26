'use client'

import { useContextData } from "@/app/context/Context"
import Form from "../addTransaction/addTransaction"
import TransactionTask from "../TransactionTask/TransactionTask"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function FinanceTracker() {

  const { transaction, currentBalance, totalExpense, totalIncome } = useContextData()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <div className="flex gap-5 items-start">
        <div className="w-full grid gap-5 overflow-hidden h-180 content-start">
          <div className="bg-white h-38.75 p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Текущий баланс</p>
              <h2 className="text-4xl font-black text-gray-900 w-50 wrap-break-word">${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-50/60 p-4 rounded-xl border border-green-100/50 w-50 grid gap-2">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <span>▲</span> Доходы
                </div>
                <Link href="/history/income" className="text-xl font-bold text-green-700 truncate">+${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Link>
              </div>

              <div className="bg-red-50/60 p-4 rounded-xl border border-red-100/50 w-50 grid gap-2">
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <span>▼</span> Расходы
                </div>
                <Link href="/history/expense" className="text-xl font-bold text-red-700 truncate">-${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col  gap-4 overflow-y-auto scrollbar-none overflow-x-hidden overscroll-contain">
            {transaction.length !== 0 && transaction.map((task) => (
              <TransactionTask key={task.id} {...task}/>
            ))}
          </div> 
        </div>

        <Form/> 
      </div>    
    </section>
  )
}
