import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaVenda.module.css";

const ResultadoBuscaVenda = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const searchUrl = `http://localhost:8080/orders/fullSearch?${query}&orderBy=${sortBy}&sortDirection=${sortDirection}`;
        console.log("URL de Busca:", searchUrl);
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          setVendas(data);
          setError(null);
        } else {
          setError("Erro ao buscar vendas:" + response.statusText);
        }
      } catch (error) {
        setError("Erro ao buscar vendas:" + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVendas();
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

  if (vendas.length === 0) {
    return <div>Nenhuma venda encontrada.</div>;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className={styles.vendaContainer}>
          <div className={styles.sortContainer}>
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="date">Data</option>
              <option value="total">Total</option>
            </select>
            <select value={sortDirection} onChange={handleSortDirectionChange}>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
          {vendas.map((venda) => (
            <div key={venda.id} className={styles.vendaItem}>
              <h3>ID da Venda: {venda.id}</h3>
              <p>Cliente: {venda.client.name}</p>
              <p>Data da Venda: {venda.date}</p>
              <p>Total da Venda: R$ {venda.total}</p>
              <h4>Itens da Venda:</h4>
              <ul>
                {venda.items.map((item) => (
                  <li key={item.id}>
                    <p>Produto: {item.product.name}</p>
                    <p>Preço Unitário: R$ {item.price}</p>
                    <p>Quantidade: {item.quantity}</p>
                    <p>Subtotal: R$ {item.subTotal}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ResultadoBuscaVenda;
