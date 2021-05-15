import style from './Button.module.sass'
import {FC} from 'react'

interface ButtonProps {
  text: string
  handleSubmit?: any
  className?: string
  type?: any
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  text,
  handleSubmit,
  className,
  type,
  disabled,
}) => {
  const cx: (...classNames: string[]) => string = (...classNames: string[]) =>
    classNames.join(' ')

  return (
    <button
      className={cx(style.button, className && className)}
      onClick={handleSubmit}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
