import style from './Button.module.sass'

type ButtonProps = {
  text: string
  handleSubmit?: any
  className?: string
  type?: any
  disabled?: boolean
}

const Button = ({
  text,
  handleSubmit,
  className,
  type,
  disabled,
}: ButtonProps) => {
  const cx = (...classNames: string[]) => classNames.join(' ')

  return (
    <button
      className={cx(style.button, className && className)}
      onClick={handleSubmit && handleSubmit}
      type={type && type}
      disabled={disabled && disabled}
    >
      {text}
    </button>
  )
}

export default Button
