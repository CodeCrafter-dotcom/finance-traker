import React from "react";

const variant = {
  tabsNotActiveB: 'tabsNotActiveB',
  tabsActiveB: 'tabsActiveB',
  submitButton: 'submitButton'
} as const

type variantT = typeof variant[keyof typeof variant]

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: variantT
}

// inline-flex                  -> делает кнопку флексбоксом для выравнивания
// items-center                 -> центрирует текст и иконки по вертикали
// justify-center               -> центрирует текст и иконки по горизонтали
// font-medium                  -> задает среднюю толщину шрифта
// rounded-lg                   -> делает аккуратное скругление углов
// transition-all               -> включает плавную анимацию для всех изменений
// duration-200                 -> задает скорость анимации в 200мс
// select-none                  -> запрещает выделение текста синим при частых кликах
// cursor-pointer               -> меняет курсор мыши на «палец» при наведении
// focus-visible:outline-none   -> убирает стандартную грубую рамку браузера
// focus-visible:ring-2         -> создает красивый ободок Tailwind при фокусе
// focus-visible:ring-offset-2  -> делает отступ-зазор между кнопкой и ободком фокуса
// focus-visible:...            -> показывает фокус ТОЛЬКО при табе с клавиатуры, не от мыши
// disabled:pointer-events-none -> намертво блокирует клики и ховеры у неактивной кнопки
// disabled:opacity-50          -> делает неактивную кнопку блеклой на 50%
const baseStyles = [`
  inline-flex items-center justify-center font-medium rounded-lg 
  select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 
`].join(' ').trim()


const variants: Record<variantT, string> = {
  tabsNotActiveB: 'py-2 text-sm font-medium text-center text-gray-500 hover:text-gray-800', 
  tabsActiveB: 'py-2 text-sm font-medium text-center bg-white shadow-sm text-gray-800',
  submitButton: 'py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm shadow-sm'
}

export default function Button({ children, variant, className, type, ...props }: ButtonProps) {
  
  return (
    <button className={`${baseStyles} ${variant ? variants[variant] : className}`} type={!type ? 'button' : type} {...props}>
      {children}
    </button>
  )
}
  