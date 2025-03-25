import React from "react";
import styles from "./PhotoDelete.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_DELETE } from "../../api";

const PhotoDelete = ({ id }) => {
  const { request, loading } = useFetch();

  async function handleDeletePhoto() {
    const confirm = window.confirm("Tem certeza de que deseja deletar a foto?");
    if (confirm) {
      const { token } = window.localStorage.getItem("user");
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleDeletePhoto} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
