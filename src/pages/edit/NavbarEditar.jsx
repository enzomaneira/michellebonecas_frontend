import React from "react";
import styles from "./NavbarEditar.module.css";
import { Link } from "react-router-dom";

function NavbarEditar() {
  return (
    <nav className={`${styles.navbar} ${styles.navbarDesafio}`}>
      <span>
        <Link to="/editarCliente">Cliente</Link>
        <Link to="/editarProduto">Produto</Link>
      </span>
    </nav>
  );
}

export default NavbarEditar;
