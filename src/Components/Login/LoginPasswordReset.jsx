import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm("password");
  const navigate = useNavigate();

  const { loading, error, request } = useFetch();

  async function handleResetPassword(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: login.password,
      });
      const { response } = await request(url, options);

      if(response.ok) navigate('/login');
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if(key) setKey(key);
    if(login) setLogin(login);
  }, []);

  return (
    <section>
      <Head title="Resetar senha" />
      <h1 className="title">Resetar senha</h1>
      <form onSubmit={handleResetPassword}>
        <Input label="Nova senha" type={'password'} {...password} />

        {loading ? (
          <Button label="Resetando..." disabled />
        ) : (
          <Button label="Resetar" />
        )}

        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginPasswordReset;
