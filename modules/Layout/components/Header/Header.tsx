import {FC, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter, NextRouter} from 'next/router'
import {Button} from '../../../../components'
import useUser from '../../../../lib/useUser'
import fetchJson from '../../../../lib/fetchJson'
import style from './Header.module.sass'

const Header: FC = () => {
  const {user, mutateUser} = useUser()

  const router: NextRouter = useRouter()

  const [show, setShow] = useState<boolean>(false)
  const [toggleClass, setToggleClass] = useState<string>(style.toggle)

  const cx: (...classNames: string[]) => string = (...classNames) =>
    classNames.join(' ')

  const showNav: () => void = () => {
    if (show) {
      setShow(false)
      setToggleClass(style.toggle)
      document.body.style.overflowY = 'show'
    } else {
      setShow(true)
      setToggleClass(cx(style.toggle, style.open))
      document.body.style.overflowY = 'hidden'
    }
  }

  return (
    <header className={style.header}>
      <nav>
        <div className={style.logo}>
          <Link href='/'>
            <a>
              <Image src='/logo.png' width={150} height={130} />
            </a>
          </Link>
        </div>
        <div className={toggleClass}>
          <div className={style.navLinks}>
            <div className={style.link}>
              <Link href='/'>
                <a>На главную</a>
              </Link>
            </div>
            <div className={style.link}>
              <Link href='/'>
                <a>О нас</a>
              </Link>
            </div>
            <div className={style.link}>
              <Link href='/'>
                <a>Продукты</a>
              </Link>
            </div>
            <div className={style.link}>
              <Link href='/'>
                <a>Фермеры</a>
              </Link>
            </div>
            <div className={style.link}>
              <Link href='/'>
                <a>Контакты</a>
              </Link>
            </div>
          </div>
          {user?.isLoggedIn ? (
            <div className={style.logout}>
              <Button
                handleSubmit={() => router.push('/profile')}
                text='Личный кабинет'
              />
              <a
                href='/api/logout'
                onClick={async e => {
                  e.preventDefault()
                  await mutateUser(fetchJson('/api/logout'))
                  await router.push('/signin')
                }}
              >
                <p>Выйти</p>
              </a>
            </div>
          ) : (
            <div className={style.loginButton}>
              <Button
                text='Войти'
                handleSubmit={() => router.push('/signin')}
              />
            </div>
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={style.burger} onClick={showNav}>
          <div className='line1' />
          <div className='line2' />
          <div className='line3' />
        </div>
      </nav>
    </header>
  )
}

export default Header
