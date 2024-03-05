import React from "react";
import Container from "../../components/Container";
import styles from "./Buscar.module.css";
import Navbar from "../../components/Navbar";
import NavbarBuscar from "./NavbarBuscar";

function Buscar() {
  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarBuscar className={styles.navbarDesafio} />
        <div className={styles.content}>
        </div>
      </Container>
    </div>
  );
}

export default Buscar;
