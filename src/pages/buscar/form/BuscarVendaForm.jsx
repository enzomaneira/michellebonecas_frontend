// BuscarVendaForm.jsx
import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarVendaForm = ({ onSubmit }) => {
  const [buscaVenda, setBuscaVenda] = useState({
    nomeProduto: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(buscaVenda);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column}>
        <Input
          type="text"
          text="Nome do Produto"
          name="nomeProduto"
          placeholder="Nome do Produto"
          handleOnChange={handleChange}
          value={buscaVenda.nomeProduto}
        />
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
          <button type="submit" className={styles.button}>
            Buscar Vendas
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuscarVendaForm;
