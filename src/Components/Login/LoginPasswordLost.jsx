import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import { PASSWORD_LOST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm("email");

  const { data, loading, error, request } = useFetch();

  async function handleLostPassword(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('esqueceuSenha', 'resetar')
      });
      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Esqueceu a senha" />
      <h1 className="title">Esqueceu a senha?</h1>
      {data ? <p style={{color: '#4c1'}}>{data}</p> : (
        <form onSubmit={handleLostPassword}>
        <Input label="Email / Usuário" {...login} />

        {loading ? (
          <Button label="Enviando..." disabled />
        ) : (
          <Button label="Enviar email" />
        )}

        <Error error={error} />
      </form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
