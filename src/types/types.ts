export type ExpenseCategoryT = 'food' | 'transport' | 'entertainment' | 'other'
export type IncomeCategoryT = 'salary' | 'freelance' | 'gift' | 'other'

export type TransactionCategoryT = ExpenseCategoryT | IncomeCategoryT

export type typeTrasactionT = 'expense' | 'income'

export interface TransactionT {
    id: string
    amount: number
    type: typeTrasactionT
    category: TransactionCategoryT
    description: string
    date: string
}

export type RawTransactionT = Omit<TransactionT, 'id' | 'date'>

export type categoriesT = Record<typeTrasactionT, string[]>