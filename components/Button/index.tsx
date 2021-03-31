import style from './Button.module.sass'

type ButtonProps = {
  text: string
  handleSubmit: any
}

const Button = ({text, handleSubmit}: ButtonProps) => {
  return (
    <button className={style.button} onClick={handleSubmit}>
      {text}
    </button>
  )
}

export default Button
