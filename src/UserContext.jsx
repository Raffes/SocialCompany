import React from "react";
import { USER_SIGNIN, TOKEN_VALIDATE_POST, USER_GET, USER_SIGNOUT } from "./api";
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(false);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    try {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      const json = await response.json();

      if(!response.ok) {
        userLogout();
        throw Error('Token inválido');
      }

      setData(json);
      setLogin(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function userLogin(email, password) {
    try {
        setError(null);
        setLoading(true);
        const { url, options } = USER_SIGNIN({ email, password });
        const tokenRes = await fetch(url, options);
        if(!tokenRes.ok) throw Error(`Usuário não encontrado`)
        const { user_id, token } = await tokenRes.json();
        window.localStorage.setItem("user", JSON.stringify({ user: user_id, token: token }));
        await getUser(token);
        navigate('/conta');
    } catch (error) {
        setError(error.message);
        setLogin(false);
    } finally {
        setLoading(false);
    }
  }

  const userLogout = React.useCallback(async function () {
    const { url, options } = USER_SIGNOUT();
    await fetch(url, options);
    setData(null);
    setLogin(false);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem('user');
  }, [])

  React.useEffect(() => {
    async function autoLogin() {
        const { token } = JSON.parse(window.localStorage.getItem('user'));
        if(token) {
            try {
                setError(null);
                setLoading(true);
                await getUser(token);
            } catch (error) {
                userLogout();
            } finally {
                setLoading(false);
            }
        } else {
          setLogin(false);
        }
    }
    autoLogin();
  }, [userLogout])

  return (
    <UserContext.Provider 
        value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};
