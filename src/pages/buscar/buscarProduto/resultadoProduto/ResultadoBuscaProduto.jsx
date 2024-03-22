import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaProduto.module.css";

const ResultadoBuscaProduto = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const searchUrl = `http://localhost:8080/products/search?${query}&orderBy=${sortBy}&sortDirection=${sortDirection}`;
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
  }, [query, sortBy, sortDirection]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleSort = () => {
    navigate(`/search?${query}&sortby=${sortBy}&sortdirection=${sortDirection}`);
  };

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
          <div className={styles.sortContainer}>
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="count">Unidades Vendidas</option>
              <option value="countMoney">Valor Arrecadado</option>
            </select>
            <select value={sortDirection} onChange={handleSortDirectionChange}>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
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
