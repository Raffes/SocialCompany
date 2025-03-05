import React from 'react'
import styles from './FeedPhotosItem.module.css'
import Image from '../Helper/Image';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleModal() {
    setModalPhoto(photo);
  }

  return <li className={styles.photo} onClick={handleModal}>
    <Image src={photo.src} alt={photo.title} />
    <span className={styles.views}>{photo.acessos}</span>
  </li>
}

export default FeedPhotosItem
