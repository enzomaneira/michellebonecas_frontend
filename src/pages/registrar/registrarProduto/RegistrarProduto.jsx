import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./RegistrarProduto.module.css"
import NavbarRegistrar from "../NavbarRegistrar";

function RegistrarProduto() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarRegistrar className={styles.navbarDesafio} />
      RegistrarProduto
    </Container>
  </div>
  );
}

export default RegistrarProduto;
