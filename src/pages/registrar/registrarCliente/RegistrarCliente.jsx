import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./RegistrarCliente.module.css"
import NavbarRegistrar from "../NavbarRegistrar";

function RegistrarCliente() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarRegistrar className={styles.navbarDesafio} />
      RegistrarCliente
    </Container>
  </div>
  );
}

export default RegistrarCliente;
