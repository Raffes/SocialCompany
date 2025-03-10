import React from "react";
import styles from "./Login.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import NotFound from "../NotFound";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === false) {
    return (
      <section className={styles.login}>
        <div className={styles.forms}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="cadastrarLogin" element={<LoginCreate />} />
            <Route path="esqueceuSenha" element={<LoginPasswordLost />} />
            <Route path="resetar" element={<LoginPasswordReset />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </section>
    );
  } else if (login === true) {
    return <Navigate to="/conta" />;
  } 
  else {
    return <></>;
  }
};

export default Login;
