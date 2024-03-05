import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarProdutoForm = ({ onSubmit }) => {
  const [produtoInfo, setProdutoInfo] = useState({
    nome: "",
    precoMin: "",
    precoMax: "",
  });

  const handleChange = (name, value) => {
    setProdutoInfo({
      ...produtoInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para buscar produtos com os dados fornecidos
    onSubmit(produtoInfo);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formContainer}`}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Produto"
            name="nome"
            placeholder="Nome"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço Mínimo"
            name="precoMin"
            placeholder="Preço Mínimo"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço Máximo"
            name="precoMax"
            placeholder="Preço Máximo"
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.fullWidth}>
        <button type="submit" className={styles.button}>
          Buscar Produto
        </button>
      </div>
    </form>
  );
};

export default BuscarProdutoForm;
