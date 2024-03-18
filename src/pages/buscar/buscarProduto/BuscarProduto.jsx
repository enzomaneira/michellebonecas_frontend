import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarProduto.module.css";
import NavbarBuscar from "../NavbarBuscar";
import BuscarProdutoForm from "../form/BuscarProdutoForm";
import ResultadoBuscaProduto from "./resultadoProduto/ResultadoBuscaProduto";
import { useNavigate } from "react-router-dom";

function BuscarProduto() {
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const navigate = useNavigate(); // Utilize useNavigate para navegação programática

  const buildSearchUrl = (produtoInfo) => {
    const params = new URLSearchParams();
    if (produtoInfo.nome) params.append("name", produtoInfo.nome);
    if (produtoInfo.precoMin) params.append("minPrice", produtoInfo.precoMin);
    if (produtoInfo.precoMax) params.append("maxPrice", produtoInfo.precoMax);
    return params.toString(); // Retorna apenas os parâmetros da busca
  };

  const handleBuscaProduto = async (produtoInfo) => {
    try {
      const searchParams = buildSearchUrl(produtoInfo);
      // Redirecionamento após a busca, enviando apenas os parâmetros da busca como query string
      navigate(`/resultadoBuscaProduto/${searchParams}`);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    }
  };


  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarBuscar className={styles.navbarDesafio} />
        <BuscarProdutoForm onSubmit={handleBuscaProduto} />
      </Container>
    </div>
  );
}

export default BuscarProduto;
