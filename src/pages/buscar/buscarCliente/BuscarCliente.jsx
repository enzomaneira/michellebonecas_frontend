// BuscarCliente.jsx
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarCliente.module.css";
import NavbarBuscar from "../NavbarBuscar";
import BuscarClienteForm from "../form/BuscarClienteForm";
import ResultadoBuscaCliente from "./resultadoCliente/ResultadoBuscaCliente";
import { useNavigate } from "react-router-dom";

function BuscarCliente() {
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const navigate = useNavigate();

  const buildSearchUrl = (clienteInfo) => {
    const params = new URLSearchParams();
    if (clienteInfo.nome) params.append("name", clienteInfo.nome);
    if (clienteInfo.contato) params.append("contact", clienteInfo.contato);
    if (clienteInfo.where) params.append("where", clienteInfo.where);
    if (clienteInfo.minCount) params.append("minCount", clienteInfo.minCount);
    if (clienteInfo.maxCount) params.append("maxCount", clienteInfo.maxCount);
    if (clienteInfo.minCountMoney) params.append("minCountMoney", clienteInfo.minCountMoney);
    if (clienteInfo.maxCountMoney) params.append("maxCountMoney", clienteInfo.maxCountMoney);
    return params.toString();
  };

  const handleBuscaCliente = async (clienteInfo) => {
    try {
      const searchParams = buildSearchUrl(clienteInfo);
      navigate(`/resultadoBuscaCliente/${searchParams}`);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarBuscar className={styles.navbarDesafio} />
        <BuscarClienteForm onSubmit={handleBuscaCliente} />
      </Container>
    </div>
  );
}

export default BuscarCliente;
