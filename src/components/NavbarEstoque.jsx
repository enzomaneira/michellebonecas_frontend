import React from "react";
import styles from "./NavbarEstoque.module.css";
import { Link } from "react-router-dom";

function NavbarBuscar() {
  return (
    <nav className={styles.navbar}>
      <span>
      <Link to="/estoqueMenu">Buscar</Link>
      <Link to="/estoqueRegistrar">Registrar</Link>
      </span>
    </nav>
  );
}

export default NavbarBuscar;
