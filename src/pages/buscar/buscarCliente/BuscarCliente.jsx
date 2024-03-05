import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarCliente.module.css"
import NavbarBuscar from "../NavbarBuscar";

function BuscarCliente() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarBuscar className={styles.navbarDesafio} />
    </Container>
  </div>
  );
}

export default BuscarCliente;
