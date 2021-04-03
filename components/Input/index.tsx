import style from './Input.module.sass'

type InputProps = {
  placeholder: string
  id: string
  name: string
  className?: string
}

const Input = ({placeholder, id, name, className}: InputProps) => {
  const cx = (...classNames: string[]) => classNames.join(' ')

  return (
    <input
      placeholder={placeholder}
      id={id}
      name={name}
      className={cx(style.input, className && className)}
    />
  )
}

export default Input
