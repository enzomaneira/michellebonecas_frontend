import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import NavbarEstoque from "../../components/NavbarEstoque";
import styles from "./EstoqueMenu.module.css";
import { useNavigate } from "react-router-dom";

function EstoqueMenu() {
  const [numeroProduto, setNumeroProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const buscarProduto = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/findByNumber?number=${numeroProduto}`);
      const data = await response.json();
      if (data) {
        setNomeProduto(data.name);
        setEstoqueProduto(data.estoque);
      } else {
        setErro("Produto não encontrado.");
        setNomeProduto("");
        setEstoqueProduto("");
      }
    } catch (error) {
      setErro("Erro ao buscar o produto.");
      setNomeProduto("");
      setEstoqueProduto("");
    }
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarEstoque className={styles.navbarDesafio} />
        <div className={`${styles.selectContainer} ${styles.formGroup}`}>
          <label htmlFor="numeroProduto">Número do Produto:</label>
          <input
            type="text"
            id="numeroProduto"
            placeHolder="Número do Produto"
            value={numeroProduto}
            onChange={(e) => setNumeroProduto(e.target.value)}
          />
          <button className={styles.buttonGroup} onClick={buscarProduto}>Buscar</button>
        </div>

        {nomeProduto && (
          <div>
            <p>Nome do Produto: {nomeProduto}</p>
            <p>Estoque: {estoqueProduto}</p>
          </div>
        )}
        {erro && <p>{erro}</p>}
      </Container>
    </div>
  );
}

export default EstoqueMenu;
