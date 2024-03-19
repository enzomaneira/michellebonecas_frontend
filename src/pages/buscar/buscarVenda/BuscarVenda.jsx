import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarVenda.module.css";
import NavbarBuscar from "../NavbarBuscar";
import BuscarVendaForm from "../form/BuscarVendaForm";
import ResultadoBuscaVenda from "./resultadoVenda/ResultadoBuscaVenda";
import { useNavigate } from "react-router-dom";

function BuscarVenda() {
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const navigate = useNavigate();

  const buildSearchUrl = (buscaVenda) => {
    const params = new URLSearchParams();
    if (buscaVenda.nomeProduto) params.append("product", buscaVenda.nomeProduto);
    if (buscaVenda.nomeCliente) params.append("client", buscaVenda.nomeCliente);
    if (buscaVenda.valorMinimo) params.append("minTotal", buscaVenda.valorMinimo);
    if (buscaVenda.valorMaximo) params.append("maxTotal", buscaVenda.valorMaximo);
    if (buscaVenda.dataMinima) params.append("minDate", buscaVenda.dataMinima);
    if (buscaVenda.dataMaxima) params.append("maxDate", buscaVenda.dataMaxima);
    return params.toString();
  };


  const handleBuscaVenda = async (vendaInfo) => {
    try {
      const searchParams = buildSearchUrl(vendaInfo);
      navigate(`/resultadoBuscaVenda/${searchParams}`);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error.message);
    }
  };


  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarBuscar className={styles.navbarDesafio} />
        <BuscarVendaForm onSubmit={handleBuscaVenda} />
      </Container>
    </div>
  );
}

export default BuscarVenda;
