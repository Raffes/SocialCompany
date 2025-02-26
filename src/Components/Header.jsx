import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import SocialCompany from '../Assets/dogs.svg?react'
import { UserContext } from '../UserContext'

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label='Social Company - Home'>
          <SocialCompany />
        </Link>

        { data ? (
          <>
            <Link className={styles.login} to="/conta">
              {data.nome}
            </Link>
            <button onClick={userLogout}>Sair</button>
          </>
        ): (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
