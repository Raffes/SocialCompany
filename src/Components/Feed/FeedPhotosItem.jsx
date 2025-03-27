import React from 'react'
import styles from './FeedPhotosItem.module.css'
import Image from '../Helper/Image';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleModal() {
    setModalPhoto(photo);
  }

  return <li id={photo.id} className={styles.photo} onClick={handleModal}>
    <Image src={photo.imageInfo.src} alt="Imagem" />
    <span className={styles.views}>{photo.acessos}</span>
  </li>
}

export default FeedPhotosItem
