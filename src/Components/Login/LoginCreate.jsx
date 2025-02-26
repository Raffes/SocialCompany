import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleCreateUser(event) {
    event.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleCreateUser}>
        <Input label="Usuário" type="text" {...username} />

        <Input label="Email" type="email" {...email} />

        <Input label="Senha" type="password" {...password} />

        {loading ? (
          <Button label="Carregando..." disabled />
        ) : (
          <Button label="Cadastrar" />
        )}

        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
