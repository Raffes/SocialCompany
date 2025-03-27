import React from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../Hooks/useFetch'
import { ACCESSES_PHOTO_UPDATE } from '../../api';
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
  const {data, error, loading, request} = useFetch();

  React.useEffect(() => {
    const { user } = JSON.parse(window.localStorage.getItem("user"));
    const { url, options } = ACCESSES_PHOTO_UPDATE(user, photo.id);
    request(url, options);
  },[photo]);

  function handleOutsideClick(event) {
    if(event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      { error && <Error error={error} /> }
      { loading && <Loading /> }
      { data && <PhotoContent data={data} onClose={handleOutsideClick} /> }
    </div>
  )
}

export default FeedModal
