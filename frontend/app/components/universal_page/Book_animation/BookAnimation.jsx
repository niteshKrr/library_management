import React from 'react'
import styles from './book_animation.module.css'

const BookAnimation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.book}></div>
      <div className={styles.book}></div>
      <div className={styles.book}></div>
      <div className={styles.book}></div>
      <div className={styles.book}></div>
      <div className={styles.book}></div>
    </div>
  );
}

export default BookAnimation
