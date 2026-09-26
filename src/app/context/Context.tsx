'use client'

import { categoriesT, TransactionT, typeTrasactionT } from "@/types/types"
import { ReactNode, createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { RawTransactionT } from "@/types/types"

interface TaskProviderT {
    children: ReactNode
}

interface ContextDataT {
    transaction: TransactionT[]
    totalIncome: number
    totalExpense: number
    currentBalance: number
    valueInputCreateCategories: string
    categories: categoriesT
    showInput: boolean
    categoryError: string | null
}

interface ContextActionsT {
    addTransaction: ({ amount, type, category, description }: RawTransactionT) => void
    deleteAllTransaction: () => void
    deleteTransaction: (id: string) => void
    setValueInputCreateCategories: (str: string) => void
    setCategories: Dispatch<SetStateAction<categoriesT>>
    setShowInput: Dispatch<SetStateAction<boolean>>
    createNewCategory: (typeTrasactionT: typeTrasactionT) => void
    deleteAllCategories: (typeTrasactionT: typeTrasactionT) => void
}

const ContextData = createContext<ContextDataT | null>(null)
const ContextActions = createContext<ContextActionsT | null>(null)

export const TaskProvider = ({ children }: TaskProviderT) => {

    const keyTransaction = 'transaction'
    const keyCategories = 'categories'

    const [transaction, setTransaction] = useState<TransactionT[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [categories, setCategories] = useState<categoriesT>({expense: [], income: []})
    const [valueInputCreateCategories, setValueInputCreateCategories] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false)
    const [categoryError, setCategoryError] = useState<string | null>(null)

    useEffect(() => {
        try {
            const savedTransactions = localStorage.getItem(keyTransaction)
            if (savedTransactions) {
                setTransaction(JSON.parse(savedTransactions))
            }
            const savedCategories = localStorage.getItem(keyCategories)
            if (savedCategories) {
                setCategories(JSON.parse(savedCategories))
            }
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    useEffect(() => {
        if(!isLoaded) return

        try {
            localStorage.setItem(keyTransaction, JSON.stringify(transaction))
            localStorage.setItem(keyCategories, JSON.stringify(categories))
        } catch (error) {
            console.error('Ошибка записи транзакций:', error)
        }
    }, [transaction, isLoaded, categories])

    const totalIncome = transaction.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc ,0)
    const totalExpense = transaction.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.amount : acc ,0)

    const currentBalance = totalIncome - totalExpense

    const addTransaction = ({ amount, type, category, description }: RawTransactionT) => {
        setTransaction(prev => {
            const newTransaction: TransactionT = {
                id: crypto.randomUUID(),
                amount: amount,
                type: type,
                category: category,
                description: description,
                date: new Date().toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })
            }
            return [...prev, newTransaction]
        })
    }

    const deleteAllTransaction = () => {
        if(transaction.length === 0) return

        const Confirm = confirm("Вы действительно удалить историю транзакций?")

        if(Confirm) setTransaction([])
    }

    const deleteTransaction = (id: string) => {
        setTransaction(prev => {
            return prev.filter(item => item.id !== id)
        })
    }

    const createNewCategory = (typeTrasactionT: typeTrasactionT) => {
        if(!showInput) {
            setShowInput(true)
            return
        }
        if(valueInputCreateCategories.trim().length === 0) {
            setShowInput(false)
            setCategoryError(null)
        }else {
            const newCategoryClean = valueInputCreateCategories.trim()

            setCategories(prev => {
                const key = typeTrasactionT as keyof typeof prev

                const isDuplicate = categories[key].some((cat) => cat.toLowerCase() === newCategoryClean.toLowerCase())

                if (isDuplicate) {
                    setCategoryError("Такая категория уже существует!") 
                    return prev
                }

                setCategoryError(null)
                return {
                    ...prev,
                    [key]: [...prev[key], newCategoryClean]
                }
            })

            const isDuplicateCheck = categories[typeTrasactionT as keyof typeof categories]
            .some((cat) => cat.toLowerCase() === newCategoryClean.toLowerCase())

            if (!isDuplicateCheck) {
                setShowInput(false)
                setValueInputCreateCategories("")
            }
        }
    }

    const deleteAllCategories = (typeTrasactionT: typeTrasactionT) => {
        if (categories[typeTrasactionT].length === 0) return

        const isConfirm = confirm("Вы действительно хотите удалить все категории для этого типа?");
        if (!isConfirm) return

        setCategories(prev => {

            return {
                ...prev,
                [typeTrasactionT]: []
            }
        })
    }

    const dataValue = {
        transaction,
        totalExpense,
        totalIncome,
        currentBalance,
        valueInputCreateCategories,
        categories,
        showInput,
        categoryError
    }

    const actionsValue = {
        addTransaction,
        deleteAllTransaction,
        deleteTransaction,
        setValueInputCreateCategories,
        setCategories,
        setShowInput,
        createNewCategory,
        deleteAllCategories
    }

    return(
        <ContextData.Provider value={dataValue}>
            <ContextActions.Provider value={actionsValue}>
                {children}
            </ContextActions.Provider>
        </ContextData.Provider>
    )
}

export const useContextData = (): ContextDataT => {
    const context: ContextDataT | null = useContext(ContextData)
    if (!context) throw new Error("useTasksActionsContext must be used within a TaskProvider")
    return context
}

export const useContextActions = (): ContextActionsT => {
    const context: ContextActionsT | null = useContext(ContextActions)
    if (!context) throw new Error("useTasksActionsContext must be used within a TaskProvider")
    return context
}