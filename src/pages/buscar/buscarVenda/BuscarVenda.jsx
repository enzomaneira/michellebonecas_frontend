import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarVenda.module.css"
import NavbarBuscar from "../NavbarBuscar";

function BuscarVenda() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarBuscar className={styles.navbarDesafio} />
    </Container>
  </div>
  );
}

export default BuscarVenda;
