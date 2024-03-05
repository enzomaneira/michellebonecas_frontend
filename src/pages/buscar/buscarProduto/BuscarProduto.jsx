import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarProduto.module.css"
import NavbarBuscar from "../NavbarBuscar";
import BuscarProdutoForm from "../form/BuscarProdutoForm";

function BuscarProduto() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarBuscar className={styles.navbarDesafio} />
      <BuscarProdutoForm/>
    </Container>
  </div>
  );
}

export default BuscarProduto;
