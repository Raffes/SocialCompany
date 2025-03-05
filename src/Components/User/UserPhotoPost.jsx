import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  function handleCreatePost(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);
    formData.append("img", img.raw);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(token, formData);
    request(url, options);
  }

  function handleUploadImg({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  React.useEffect(() => {
    data && navigate("/conta");
  }, [data, navigate]);

  return (
    <>
      <Head title="Criar Post" />
      <section className={`${styles.photoPost} animeLeft`}>
        <form onSubmit={handleCreatePost}>
          <Input label="Nome" type="text" {...nome} />

          <Input label="Peso" type="number" {...peso} />

          <Input label="Idade" type="number" {...idade} />

          <input
            className={styles.file}
            type="file"
            name="img"
            id="img"
            onChange={handleUploadImg}
          />

          {loading ? (
            <Button label="Enviando..." disabled />
          ) : (
            <Button label="Enviar" />
          )}

          <Error error={error} />
        </form>

        <div>
          {img.preview && (
            <div
              className={styles.preview}
              style={{ backgroundImage: `url('${img.preview}')` }}
            ></div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserPhotoPost;
