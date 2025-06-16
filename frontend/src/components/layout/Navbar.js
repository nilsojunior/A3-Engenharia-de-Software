import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/Logo.png";
import { Context } from "../../context/UserContext";
import { useContext } from "react";

function Navbar() {
    const { authenticated, logout } = useContext(Context);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_Logo}>
                <img src={Logo} alt="Adote.me" />
                <h2>Adote.me</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/pets/myadoptions">Minhas adoções</Link>
                        </li>
                        <li>
                            <Link to="/pets/mypets">Meus Pets</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Meu Perfil</Link>
                        </li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastre-se</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
