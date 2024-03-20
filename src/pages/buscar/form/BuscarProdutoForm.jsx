import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarProdutoForm = ({ onSubmit }) => {
  const [produtoInfo, setProdutoInfo] = useState({
    nome: "",
    precoMin: "",
    precoMax: "",
    minCount: "",
    maxCount: "",
    minCountMoney: "",
    maxCountMoney: "",
  });

  const handleChange = (name, value) => {
    setProdutoInfo({
      ...produtoInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Nome:", produtoInfo.nome);
    console.log("Preço Mínimo:", produtoInfo.precoMin);
    console.log("Preço Máximo:", produtoInfo.precoMax);
    console.log("Count min: ", produtoInfo.minCount);
    console.log("Count max: ", produtoInfo.maxCount);
    console.log("Money min: ", produtoInfo.minCountMoney);
    console.log("Money max: ", produtoInfo.maxCountMoney);
    onSubmit(produtoInfo);
  };


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Produto"
            name="nome"
            placeholder="Nome"
            handleOnChange={handleChange}
            value={produtoInfo.nome}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço Mínimo"
            name="precoMin"
            placeholder="Preço Mínimo"
            handleOnChange={handleChange}
            value={produtoInfo.precoMin}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço Máximo"
            name="precoMax"
            placeholder="Preço Máximo"
            handleOnChange={handleChange}
            value={produtoInfo.precoMax}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Quantidade Mínima"
            name="minCount"
            placeholder="Quantidade Mínima"
            handleOnChange={handleChange}
            value={produtoInfo.minCount}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Quantidade Máxima"
            name="maxCount"
            placeholder="Quantidade Máxima"
            handleOnChange={handleChange}
            value={produtoInfo.maxCount}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Valor Mínimo"
            name="minCountMoney"
            placeholder="Valor Mínimo"
            handleOnChange={handleChange}
            value={produtoInfo.minCountMoney}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Valor Máximo"
            name="maxCountMoney"
            placeholder="Valor Máximo"
            handleOnChange={handleChange}
            value={produtoInfo.maxCountMoney}
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
