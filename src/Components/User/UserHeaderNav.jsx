import React from "react";
import styles from "./UserHeaderNav.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import Adicionar from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}>
        </button>
      )}

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" className={pathname === "/conta" && styles.active}>
          <MinhasFotos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink
          to="/conta/estatisticas"
          className={pathname === "/conta/estatisticas" && styles.active}
        >
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink
          to="/conta/criarPost"
          className={pathname === "/conta/criarPost" && styles.active}
        >
          <Adicionar />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={handleLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
