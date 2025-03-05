import React from 'react'
import styles from './Footer.module.css'
import SocialCompanySVG from '../Assets/dogs-footer.svg?react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <SocialCompanySVG />
      <p>&copy; {year} | Social Company </p>
    </div>
  )
}

export default Footer
