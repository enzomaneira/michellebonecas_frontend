import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaCliente.module.css";

const ResultadoBuscaCliente = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const searchUrl = `http://localhost:8080/clients/findByNameAndContact?${query}&orderBy=${sortBy}&sortDirection=${sortDirection}`;
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          setClientes(data);
          setError(null);
        } else {
          setError("Erro ao buscar clientes:" + response.statusText);
        }
      } catch (error) {
        setError("Erro ao buscar clientes:" + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
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

  if (clientes.length === 0) {
    return <div>Nenhum cliente encontrado.</div>;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className={styles.clientContainer}>
          <div className={styles.sortContainer}>
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="name">Nome</option>
              <option value="contact">Contato</option>
              <option value="count">Compras feitas</option>
              <option value="countMoney">Valor Gasto</option>
            </select>
            <select value={sortDirection} onChange={handleSortDirectionChange}>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>
          {clientes.map((cliente) => (
            <div key={cliente.id} className={styles.clientItem}>
              <h3>{cliente.name} - Número: {cliente.number}</h3>
              <p>Onde: {client.where}</p>
              <p>Contato: {cliente.contact}</p>
              <p>Compras feitas: {cliente.count}</p>
              <p>Valor Gastso: {cliente.countMoney}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ResultadoBuscaCliente;
