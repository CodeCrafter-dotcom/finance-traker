'use client'

import { useContextData } from "@/app/context/Context"
import Header from "@/app/layout/Header/Header"
import Main from "@/app/layout/Main/Main"
import TransactionTask from "@/app/components/TransactionTask/TransactionTask"

interface HistoryProps {
    history: string
}

export default function History({ history }: HistoryProps) {

    const { transaction, totalIncome, totalExpense } = useContextData()

    const filteredTransactions = transaction.filter(item => item.type === history)

    if(history === 'income') {
        return(
            <>
            <Header/>
            <Main>
                <section>
                    <div className="grid gap-5 h-180 content-start overflow-hidden">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-black text-gray-900">История доходов</h1>
                            <p className="text-xl font-bold text-green-700">+${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="flex flex-col  gap-4 overflow-y-auto scrollbar-none overflow-x-hidden overscroll-contain">
                            {filteredTransactions.length > 0 ? filteredTransactions.map(item => <TransactionTask key={item.id} {...item}/>) 
                            : <p className="text-xl font-medium">истории доходов нету</p>}
                        </div>
                    </div>
                </section>
            </Main>
            </>
        )
    } else {
        return(
            <>
            <Header/>
            <Main>
                <section>
                    <div className="grid gap-5 h-180 content-start overflow-hidden">
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-black text-gray-900">История расходов</h1>
                            <p className="text-xl font-bold text-red-700">-${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="flex flex-col  gap-4 overflow-y-auto scrollbar-none overflow-x-hidden overscroll-contain">
                            {filteredTransactions.length > 0 ? filteredTransactions.map(item => <TransactionTask key={item.id} {...item}/>) 
                            : <p className="text-xl font-medium">истории расходов нету</p>}
                        </div>
                    </div>
                </section>
            </Main>
            </>
        )
    }
}