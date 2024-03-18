import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./BuscarProduto.module.css";
import NavbarBuscar from "../NavbarBuscar";
import BuscarProdutoForm from "../form/BuscarProdutoForm";
import ResultadoBuscaProduto from "./resultadoProduto/ResultadoBuscaProduto";

function BuscarProduto() {
  const [resultadosBusca, setResultadosBusca] = useState([]);


  const buildSearchUrl = (produtoInfo) => {
    const params = new URLSearchParams();
    if (produtoInfo.nome) params.append("name", produtoInfo.nome);
    if (produtoInfo.precoMin) params.append("minPrice", produtoInfo.precoMin);
    if (produtoInfo.precoMax) params.append("maxPrice", produtoInfo.precoMax);
    const searchUrl = `http://localhost:8080/products/search?${params}`;
    console.log("URL de busca:", searchUrl);
    return searchUrl;
  };

  const handleBuscaProduto = async (produtoInfo) => {
    try {
      const searchUrl = buildSearchUrl(produtoInfo);
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        setResultadosBusca(data);
      } else {
        console.error("Erro ao buscar produtos:", response.statusText);
      }
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
        <ResultadoBuscaProduto produtos={resultadosBusca} />
      </Container>
    </div>
  );
}

export default BuscarProduto;
