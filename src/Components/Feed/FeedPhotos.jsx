import React from "react";
import styles from "./FeedPhotos.module.css";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ lastPostId, user, setModalPhoto, setInfinite, setLastPostId }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ total, user, lastPostId });
      const { response, json } = await request(url, options);
      setLastPostId(json.lastDocId);
      if(response && response.ok && json.posts.length < total) setInfinite(false)
    }
    fetchPhotos();
  }, [request, user, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.posts.length)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.posts.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return data && !data.length ? 'Nenhuma postagem encontrada' : null;
};

export default FeedPhotos;
