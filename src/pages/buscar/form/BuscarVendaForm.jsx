import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarVendaForm = () => {
  const [buscaVenda, setBuscaVenda] = useState({
    produtos: [{ nomeProduto: "", quantidade: 1 }], // Inicialmente, um campo para um produto
    nomeCliente: "",
    valorMinimo: "",
    valorMaximo: "",
    dataMinima: "",
    dataMaxima: "",
  });

  const handleChange = (name, value) => {
    setBuscaVenda({
      ...buscaVenda,
      [name]: value,
    });
  };

  const handleProdutoChange = (index, name, value) => {
    const novosProdutos = [...buscaVenda.produtos];
    novosProdutos[index] = {
      ...novosProdutos[index],
      [name]: value,
    };

    setBuscaVenda({
      ...buscaVenda,
      produtos: novosProdutos,
    });
  };

  const handleAddProduto = () => {
    setBuscaVenda({
      ...buscaVenda,
      produtos: [...buscaVenda.produtos, { nomeProduto: "", quantidade: 1 }],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para buscar vendas com os dados informados
    console.log("Dados da busca:", buscaVenda);
    // Limpar os campos ou realizar a busca, conforme necessário
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formContainer}`}>
      <div className={styles.column}>
        {buscaVenda.produtos.map((produto, index) => (
          <div key={index}>
            <Input
              type="text"
              text={`Nome do Produto ${index + 1}`}
              name={`nomeProduto-${index}`}
              placeholder="Nome do Produto"
              handleOnChange={(value) => handleProdutoChange(index, "nomeProduto", value)}
              value={produto.nomeProduto}
            />
            <Input
              type="number"
              text={`Quantidade do Produto ${index + 1}`}
              name={`quantidade-${index}`}
              placeholder="Quantidade"
              handleOnChange={(value) => handleProdutoChange(index, "quantidade", value)}
              value={produto.quantidade}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduto} className={styles.buttonAddProduto}>
          Adicionar Produto
        </button>
      </div>
      <div className={styles.column}>
        <Input
          type="text"
          text="Nome do Cliente"
          name="nomeCliente"
          placeholder="Nome do Cliente"
          handleOnChange={handleChange}
          value={buscaVenda.nomeCliente}
        />
        <Input
          type="number"
          text="Valor Mínimo"
          name="valorMinimo"
          placeholder="Valor Mínimo"
          handleOnChange={handleChange}
          value={buscaVenda.valorMinimo}
        />
        <Input
          type="number"
          text="Valor Máximo"
          name="valorMaximo"
          placeholder="Valor Máximo"
          handleOnChange={handleChange}
          value={buscaVenda.valorMaximo}
        />
        <Input
          type="date"
          text="Data Mínima"
          name="dataMinima"
          placeholder="Data Mínima"
          handleOnChange={handleChange}
          value={buscaVenda.dataMinima}
        />
        <Input
          type="date"
          text="Data Máxima"
          name="dataMaxima"
          placeholder="Data Máxima"
          handleOnChange={handleChange}
          value={buscaVenda.dataMaxima}
        />
        <div className={styles.fullWidth}>
          <button type="submit" className={styles.buttonSubmit}>
            Buscar Vendas
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuscarVendaForm;
