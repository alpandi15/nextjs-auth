import type {FC, ButtonHTMLAttributes} from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({children, disabled, className, type}) => {
  return (
    <div>
      <button
        className={
          cn({
            'px-4 py-2 disabled:bg-gray-200 disabled:text-gray-400 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 text-sm text-white py-1 px-2 rounded': true
          }, className)
        }
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    </div>
  )
}

export default Button