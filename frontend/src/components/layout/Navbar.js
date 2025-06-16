import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/Logo.png";

function Navbar() {
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
                <li>
                    <Link to="/login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastre-se</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
