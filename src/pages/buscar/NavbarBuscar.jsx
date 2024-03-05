// NavbarBuscar.jsx
import React from "react";
import styles from "./NavbarBuscar.module.css";
import { Link } from "react-router-dom";

function NavbarBuscar() {
  return (
    <nav className={styles.navbar}>
      <span>
        <Link to="/buscarCliente">Cliente</Link>
        <Link to="/buscarProduto">Produto</Link>
        <Link to="/buscarPedido">Pedido</Link>
      </span>
    </nav>
  );
}

export default NavbarBuscar;
