import React from 'react'
import styles from './Input.module.css'

const Input = ({ label, type, value, error, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
      </label>

      <input 
        className={styles.input} 
        type={type}
        value={value}
        onChange={onChange} />

      { error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Input
