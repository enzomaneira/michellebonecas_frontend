import React from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./RegistrarVenda.module.css"
import NavbarRegistrar from "../NavbarRegistrar";
import AddPedidoForm from "../form/AddPedidoForm";

function RegistrarVenda() {
  return (
    <div>
    <Navbar />
    <Container className={styles.container}>
      <NavbarRegistrar className={styles.navbarDesafio} />
      <AddPedidoForm/>
    </Container>
  </div>
  );
}

export default RegistrarVenda;
