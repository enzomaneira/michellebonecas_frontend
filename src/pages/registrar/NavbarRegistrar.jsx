import React from "react";
import styles from "./NavbarRegistrar.module.css";
import { Link } from "react-router-dom";

function NavbarRegistrar() {
  return (
    <nav className={`${styles.navbar} ${styles.navbarDesafio}`}>
      <span>
        <Link to="/registrarCliente">Cliente</Link>
        <Link to="/registrarProduto">Produto</Link>
        <Link to="/registrarPedido">Pedido</Link>
      </span>
    </nav>
  );
}

export default NavbarRegistrar;
