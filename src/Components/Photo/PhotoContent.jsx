import React from "react";
import styles from "./PhotoContent.module.css";
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import { UserContext } from "../../UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";

const PhotoContent = ({ data, single, onClose }) => {
  const photo = data;
  // const { photo, comments } = data;
  const user = React.useContext(UserContext);

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      {onClose && (
        <button className={styles.closeModal} title="Fechar foto" onClick={onClose}>
          &#10006;
        </button>
      )}
      
      <div className={styles.img}>
        <Image src={photo.imageInfo.src} alt={"Imagem"} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            { user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            
            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{"Imagem"}</Link>
          </h1>
          {/* <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul> */}
        </div>
      </div>
      {/* <PhotoComments id={photo.id} single={single} comments={comments} /> */}
    </div>
  );
};

export default PhotoContent;
