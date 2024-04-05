import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import NavbarEstoque from "../../components/NavbarEstoque";
import styles from "./EstoqueRegistrar.module.css";

function EstoqueRegistrar() {
  const [numeroProduto, setNumeroProduto] = useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = useState("");

  const handleUpdateEstoque = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/findByNumber?number=${numeroProduto}`);
      const data = await response.json();

      if (data && data.id) {
        await fetch(`http://localhost:8080/products/${data.id}/stock?quantity=${quantidadeEstoque}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setNumeroProduto("");
        setQuantidadeEstoque("");
        alert("Estoque atualizado com sucesso!");
      } else {
        alert("Produto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert("Erro ao atualizar estoque. Verifique a conexão ou tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <Navbar/>
      <Container className={styles.container}>
        <NavbarEstoque className={styles.navbarDesafio} />
        <div className={styles.form}>
          <label htmlFor="numeroProduto">Número do Produto:</label>
          <input
            type="number"
            placeholder="Número do Produto"
            value={numeroProduto}
            onChange={(e) => setNumeroProduto(e.target.value)}
          />
          <label htmlFor="quantidadeEstoque">Quantidade a Adicionar:</label>
          <input
            type="number"
            placeholder="Quantidade a Adicionar"
            value={quantidadeEstoque}
            onChange={(e) => setQuantidadeEstoque(e.target.value)}
          />
          <button onClick={handleUpdateEstoque}>Atualizar Estoque</button>
        </div>

      </Container>
    </div>
  );
}

export default EstoqueRegistrar;
