import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarVenda.module.css"
import NavbarBuscar from "../NavbarBuscar";
import BuscarVendaForm from "../form/BuscarVendaForm"

function BuscarVenda() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarBuscar className={styles.navbarDesafio} />
      <BuscarVendaForm/>
    </Container>
  </div>
  );
}

export default BuscarVenda;
