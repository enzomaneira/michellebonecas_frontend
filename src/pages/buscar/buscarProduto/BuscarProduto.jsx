import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarProduto.module.css"
import NavbarBuscar from "../NavbarBuscar";

function BuscarProduto() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarBuscar className={styles.navbarDesafio} />
    </Container>
  </div>
  );
}

export default BuscarProduto;
