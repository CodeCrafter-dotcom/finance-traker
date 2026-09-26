import { TransactionT, TransactionCategoryT } from "@/types/types";
import Button from "../ui/Button/Button";
import { useContextActions } from "@/app/context/Context";

const categoryIcons: Record<TransactionCategoryT, string> = {
  food: '🍏',
  transport: '🚗',
  entertainment: '🎬',
  salary: '💰',
  freelance: '💻',
  gift: '🎁',
  other: '📦',
}

const categoryLabels: Record<TransactionCategoryT, string> = {
  food: 'Продукты и еда',
  transport: 'Транспорт',
  entertainment: 'Развлечения',
  salary: 'Зарплата',
  freelance: 'Фриланс',
  gift: 'Подарок',
  other: 'Другое'
}

export default function TransactionTask({ amount, id, description, category, type, date}: TransactionT) {

  const { deleteTransaction } = useContextActions()

  const isIncome = type === 'income'

  return(
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between ">
      <div className="flex items-center gap-3.5">
        <Button onClick={() => deleteTransaction(id)} className={`group w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
          isIncome ? 'bg-green-100 hover:bg-black' : 'bg-red-100 hover:bg-black'
        }`}>
          <span className="group-hover:hidden">
            {categoryIcons[category] ? (
              categoryIcons[category]
            ) : (
              (
                type === 'expense' ? <span>▼</span> : <span>▲</span>
              )
            )}
          </span>

          <span className="hidden group-hover:block font-bold text-white">
            ✕
          </span>
        </Button>

        <div className="grid gap-0.5">
          <p  
          className="text-sm font-bold text-gray-900 leading-snug w-140 wrap-break-word"
          >
            {description}
          </p>
          <span className="text-xs font-medium text-gray-400">
            {categoryLabels[category] || category}
          </span>
        </div>
      </div>

      <div className="text-right grid gap-0.5 w-55">
        <p className={`text-base font-extrabold tracking-tight ${
          isIncome ? 'text-green-600' : 'text-red-700'
        }`}>
          {isIncome ? `+$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
          : `-$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        </p>
        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          {date}
        </span>
      </div>
    </div>
  )
}