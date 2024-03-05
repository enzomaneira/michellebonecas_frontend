import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./RegistrarCliente.module.css";
import NavbarRegistrar from "../NavbarRegistrar";
import AddClienteForm from "../form/AddClienteForm";


function RegistrarCliente() {
  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarRegistrar className={styles.navbarRegistro} />
        <AddClienteForm />
      </Container>
    </div>
  );
}

export default RegistrarCliente;
