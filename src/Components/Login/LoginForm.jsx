import React from "react";
import styles from "./LoginForm.module.css";
import stylesBtn from '../Forms/Button.module.css'
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginForm = () => {
  const email = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Email" type="email" {...email} />

        <Input label="Senha" type="password" {...password} />

        {loading ? (
          <Button disabled label="Carregando..." />
        ) : (
          <Button label="Entrar" />
        )}

        <Error error={error && 'Dados incorretos.'} />
      </form>
      <Link className={styles.esqueceuSenha} to="/login/esqueceuSenha">Esqueceu a senha?</Link>
      
      <div className={styles.cadastroLogin}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/cadastrarLogin">Cadastro</Link>
      </div>
    
    </section>
  );
};

export default LoginForm;
