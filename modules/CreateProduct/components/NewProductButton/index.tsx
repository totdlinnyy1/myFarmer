import {FiPlus} from 'react-icons/fi'
import style from './NewProductButton.module.sass'

const NewProductButton = ({onClick}) => {
  return (
    <div className={style.container}>
      <div>
        <a onClick={onClick}>
          добавить товар <FiPlus size={16} />
        </a>
      </div>
    </div>
  )
}

export default NewProductButton
