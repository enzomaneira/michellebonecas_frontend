import React from "react";
import Container from "../../components/Container";
import styles from "./Registrar.module.css";
import Navbar from "../../components/Navbar";
import NavbarRegistrar from "./NavbarRegistrar";

function Registrar() {
  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarRegistrar />
      </Container>
    </div>
  );
}

export default Registrar;
