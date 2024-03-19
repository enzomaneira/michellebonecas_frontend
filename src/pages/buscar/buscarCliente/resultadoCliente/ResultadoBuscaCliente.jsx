import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../components/Container";
import Navbar from "../../../../components/Navbar";
import styles from "./ResultadoBuscaCliente.module.css";

const ResultadoBuscaCliente = () => {
  const { query } = useParams();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const searchUrl = `http://localhost:8080/clients/findByNameAndContact?${query}`;
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
  }, [query]);

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
          {clientes.map((cliente) => (
            <div key={cliente.id} className={styles.clientItem}>
              <h3>{cliente.name}</h3>
              <p>Contato: {cliente.contact}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ResultadoBuscaCliente;

