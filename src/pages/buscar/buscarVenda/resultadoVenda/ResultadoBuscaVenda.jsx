// ResultadoBuscaVenda.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaVenda.module.css";

const ResultadoBuscaVenda = () => {
  const { query } = useParams();
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const searchUrl = `http://localhost:8080/orders/fullSearch?${query}`;
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
  }, [query]);

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
