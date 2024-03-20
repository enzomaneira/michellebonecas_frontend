import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaProduto.module.css";

const ResultadoBuscaProduto = () => {
  const { query } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchProdutos = async () => {
        try {
          const searchUrl = `http://localhost:8080/products/search?${query}`;
          console.log("URL de Busca:", searchUrl);
          const response = await fetch(searchUrl);
          if (response.ok) {
            const data = await response.json();
            setProdutos(data);
            setError(null);
          } else {
            setError("Erro ao buscar produtos:" + response.statusText);
          }
        } catch (error) {
          setError("Erro ao buscar produtos:" + error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProdutos();
    }, [query]);


  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (produtos.length === 0) {
    return <div>Nenhum produto encontrado.</div>;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className={styles.productContainer}>
          {produtos.map((produto) => (
            <div key={produto.id} className={styles.productItem}>
              <h3>{produto.name}</h3>
              <p>Preço: R$ {produto.price}</p>
              <p>Unidades Vendidas: {produto.count}</p>
              <p>Valor Arrecadado: R$ {produto.countMoney}</p>
              <img src={produto.imgUrl} alt={produto.name} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ResultadoBuscaProduto;
