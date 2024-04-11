import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import mmbLogo from "../../public/mmb.png";

function Navbar() {
    return (
    <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
            <img src={mmbLogo} alt="MMB Logo" className={styles.logo} />
        </div>
        <div className={styles.right}>
        <h2><Link to="/registrarCliente">Registrar</Link>
        <Link to="/buscarCliente">Buscar</Link>
        <Link to="/graficos">Gráficos</Link>
        <Link to="/status">Status</Link>
        <Link to="/estoqueMenu">Estoque</Link>
        <Link to="/editarCliente">Editar</Link>
        </h2>
        </div>
        <div className={styles.right}>
        </div>
    </nav>
    );
}

export default Navbar;
