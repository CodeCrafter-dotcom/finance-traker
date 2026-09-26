'use client'

import Button from "../ui/Button/Button"
import { ChangeEvent, useRef, useState} from "react"
import Input from "../ui/Input/Input"
import { TransactionCategoryT, RawTransactionT, typeTrasactionT } from "@/types/types"
import { useContextActions, useContextData } from "@/app/context/Context"

interface SelectOptionI {
  value: TransactionCategoryT
  label: string
}

const transactionCategories: Record<'expense' | 'income', SelectOptionI[]> = {
  income: [
    { value: 'salary', label: '💰 Зарплата'},
    { value: 'freelance', label: '💻 Фриланс'},
    { value: 'gift', label: '🎁 Подарок'},
    { value: 'other', label: '📦 Другое'},
  ],
  expense: [
    { value: 'food', label: '🍏 Продукты'},
    { value: 'transport', label: '🚗 Транспорт'},
    { value: 'entertainment', label: '🎬 Развлечения'},
    { value: 'other', label: '📦 Другое'},
  ]
}

type FormErrorsT = Partial<Record<keyof RawTransactionT, string>>

export default function Form() {

  const [activeTab, setActiveTab] = useState<typeTrasactionT>('expense')
  const [errors, setErrors] = useState<FormErrorsT>()

  const descriptionInput = useRef<HTMLInputElement>(null)
  const sumInput = useRef<HTMLInputElement>(null)
  const categorySelect = useRef<HTMLSelectElement>(null)

  const { addTransaction, setValueInputCreateCategories, createNewCategory, deleteAllCategories } = useContextActions()
  const { valueInputCreateCategories, showInput, categories, categoryError } = useContextData()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget) 
    const data = Object.fromEntries(formData)
   
    const validationErrors: FormErrorsT = {}
    const description = String(data.description).trim()
    if(!description) {
     validationErrors.description = 'описание обязательно для заполнения'
     descriptionInput.current?.focus()
     setErrors(validationErrors)
     return
    }

    const rawSum = String(data.amount).trim()
    const amount = Number(rawSum)
    if(rawSum === '') {
     validationErrors.amount = 'сумма обязательно для заполнения'
     sumInput.current?.focus()
     setErrors(validationErrors)
     return
    } else if (amount <= 0) {
     validationErrors.amount = 'сумма должна быть больше нуля'
     sumInput.current?.focus()
     setErrors(validationErrors)
     return
    }

    const category = data.category as TransactionCategoryT
    if(!category) {
      validationErrors.category = 'выберите категорию'
    }

    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    const validatedData: RawTransactionT = {description, amount, type: activeTab, category}
    addTransaction(validatedData)
    e.currentTarget.reset()
  }

  return(
    <form 
      onSubmit={handleSubmit}
      className="grid gap-4 px-2.5 py-2 min-w-90 border rounded-2xl border-gray-900"
      noValidate
      >
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
          <Button
          variant={activeTab === 'expense' ? 'tabsActiveB' : 'tabsNotActiveB'}
          onClick={() => setActiveTab('expense')}
          >
            Расход
          </Button>

          <Button
          variant={activeTab === 'income' ? 'tabsActiveB' : 'tabsNotActiveB'}
          onClick={() => setActiveTab('income')}
          >
            Доход
          </Button>
        </div>
        <div className="grid gap-3.5">
          <Input
          label={errors?.description ? errors.description : 'Описание'}
          placeholder={activeTab === 'expense' ? 'Например: Покупка кофе' : 'Например: Аванс по проекту'}
          variantInput="inputForm"
          variantLabel="labelForm"
          variantContainer="containerForm"
          type="text"
          name="description"
          ref={descriptionInput}
          autoFocus
          autoComplete="off"
          maxLength={100}
          />
          <Input
          label={errors?.amount ? errors.amount : 'Сумма'}
          variantInput="inputForm"
          variantLabel="labelForm"
          variantContainer="containerForm"
          type="number" 
          placeholder="0.00"
          name="amount"
          ref={sumInput}
          max={99999999}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            if (e.currentTarget.value.length > 11) {
              e.currentTarget.value = e.currentTarget.value.slice(0, 11);
            }
          }}
          />

          <div className="grid gap-3">
            <div className="grid gap-2">
              <label 
              className="block text-xs font-semibold text-gray-500 uppercase" 
              htmlFor="categoryId"
              >
                {errors?.category ? errors.category : 'Категория'}
              </label>

              <div className="grid grid-cols-2 gap-2">
                <select 
                name="category" 
                id="categoryId" 
                defaultValue='' 
                key={activeTab} 
                ref={categorySelect}
                className="pl-1 py-2 w-full text-sm bg-gray-50 border rounded-lg text-gray-900"
                >
                  <option value="" disabled hidden>
                    Выберите категорию
                  </option>
                  {transactionCategories[activeTab].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  {categories[activeTab]?.length !== 0 && categories[activeTab]?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <Button
                className="bg-black text-white p-2 text-[12px] hover:bg-gray-700"
                onClick={() => deleteAllCategories(activeTab)}
                >
                  удалить категории этого типа
                </Button>
              </div>
            </div>

            <div className="grid gap-2 group">
              {showInput && (
                <Input
                label={categoryError ? categoryError : 'Введите новую категорию'}
                placeholder="Новая категория"
                type="text"
                variantInput="inputForm"
                variantLabel="labelForm"
                variantContainer="containerForm"
                value={valueInputCreateCategories}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueInputCreateCategories(e.target.value)}
                maxLength={25}
                minLength={5}
                autoFocus
                />
              )}
              <Button
              className="
                border border-gray-300 hover:border-black text-black hover:text-black 
                py-2 gap-2 shadow-sm text-sm font-semibold
              "
              onClick={() => createNewCategory(activeTab)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Добавить категорию
              </Button>
            </div>
          </div>
        </div>

        <Button type="submit" variant="submitButton">
          Добавить запись
        </Button>
    </form>
  )
}