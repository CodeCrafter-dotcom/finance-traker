import type React from "react";
import { Ref, useId } from "react";

const variantInput = {
    inputForm: 'inputForm'
} as const

const variantLabel = {
    labelForm: 'labelForm'
} as const

const variantContainer = {
    containerForm: 'containerForm'
} as const

type variantInputT = typeof variantInput[keyof typeof variantInput]
type variantLabelT = typeof variantLabel[keyof typeof variantLabel]
type variantContainerT = typeof variantContainer[keyof typeof variantContainer]

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variantInput?: variantInputT
    variantLabel?: variantLabelT
    variantContainer?: variantContainerT
    label: string
    ref?: Ref<HTMLInputElement>
}

// w-full                       -> растягивает инпут на всю ширину контейнера
// text-sm                      -> аккуратный (компактный) размер шрифта для текста формы
// bg-gray-50                   -> задает мягкий светло-серый фоновый цвет по умолчанию
// border                       -> добавляет базовую рамку толщиной в 1 пиксель
// rounded-lg                   -> делает аккуратное скругление углов у инпута
// text-gray-900                -> устанавливает контрастный темный цвет для вводимого текста
// placeholder:text-gray-400    -> делает текст-подсказку (placeholder) приглушенно-серым
// outline-none                 -> убирает стандартную системную обводку браузера при фокусе
// transition-all               -> включает плавную анимацию для всех изменяемых свойств
// duration-200                 -> задает скорость анимации в 200 миллисекунд
// disabled:bg-gray-100         -> при блокировке (disabled) делает фон инпута более темным
// disabled:text-gray-400       -> делает текст внутри заблокированного инпута тусклым
// disabled:cursor-not-allowed  -> меняет курсор мыши на «запрещающий знак» при блокировке
const baseInputStyles = [`
    w-full text-sm bg-gray-50 border rounded-lg 
    text-gray-900 placeholder:text-gray-400 outline-none
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    focus:border-blue-500 
`].join(' ').trim()

const baseLabelStyles = 'sr-only'

const baseContainerStyles = 'w-full'
  
const variantsInput: Record<variantInputT, string> = {
    inputForm: 'pl-1 py-2'
}

const variantsLabel: Record<variantLabelT, string> = {
    labelForm: 'block text-xs font-semibold text-gray-500 uppercase'
}

const variantsContainer: Record<variantContainerT, string> = {
    containerForm: 'grid gap-2'
}

export default function Input({ label, variantInput, variantLabel, className, variantContainer, ref, type, ...props }: InputProps) {

    const id = useId()

    return(
        <div className={`${baseContainerStyles} ${variantContainer ? variantsContainer[variantContainer] : ''}`}>
            <label 
            htmlFor={id} 
            className={variantLabel ? variantsLabel[variantLabel] : baseLabelStyles}
            >
            {label}
            </label>

            <input
            id={id}
            className={`${baseInputStyles} ${variantInput ? variantsInput[variantInput] : className}`}
            ref={ref}
            type={!type ? 'text' : type}
            {...props}
            />
        </div>
    )
}