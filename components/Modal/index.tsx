import {ReactNode} from 'react'
import Modal from 'react-modal'
import {IoClose} from 'react-icons/io5'
import style from './ModalWindow.module.sass'

type ModalWindowProps = {
  width: number
  height: number
  title: string
  isOpen: boolean
  onClick: any
  children: ReactNode
}

const ModalWindow = ({
  width,
  height,
  title,
  isOpen,
  onClick,
  children,
}: ModalWindowProps) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: width,
          height: height,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      ariaHideApp={false}
    >
      <div className={style.header}>
        <div>
          <h1>{title}</h1>
        </div>
        <div onClick={onClick}>
          <IoClose />
        </div>
      </div>
      <div>{children}</div>
    </Modal>
  )
}

export default ModalWindow
