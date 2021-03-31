import {NextComponentType} from 'next'
import style from './Footer.module.sass'

const Footer: NextComponentType = () => {
  return (
    <footer className={style.footer}>
      <h1>Подвал</h1>
    </footer>
  )
}

export default Footer
