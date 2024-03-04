import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";


function Navbar() {
    return (
    <nav className={styles.navbar}>
        <div className={styles.right}>
        <h2><Link to="/registrar">Registrar</Link>
        <Link to="/buscar">Buscar</Link></h2>
        </div>
        <div className={styles.right}>
        </div>
    </nav>
    );
}

export default Navbar;