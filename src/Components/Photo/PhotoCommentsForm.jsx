import React from 'react'
import Enviar from '../../Assets/enviar.svg?react'
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from "../Helper/Error";
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({id, single, setComments}) => {
  const { request, error } = useFetch();
  const [comment, setComment] = React.useState('');

   async function handleAddComment(event) {
    event.preventDefault();
    const { token } = window.localStorage.getItem("user");
    const { url, options } = COMMENT_POST(id, token, {comment});
    const { response, json } = await request(url, options);
    if(response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
   }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleAddComment}>
      <textarea className={styles.textarea} value={comment} placeholder='Adicionar comentário' onChange={({target}) => setComment(target.value)} />
      <button className={styles.button}><Enviar/></button>
      { error && <Error error={error} /> }
    </form>
  )
}

export default PhotoCommentsForm
