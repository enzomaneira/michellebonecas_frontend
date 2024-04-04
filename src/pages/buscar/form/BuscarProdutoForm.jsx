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
    minReleaseYear: "",
    maxReleaseYear: "",
    productType: "",
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
    console.log("Ano de Lançamento Mínimo:", produtoInfo.minReleaseYear);
    console.log("Ano de Lançamento Máximo:", produtoInfo.maxReleaseYear);
    console.log("Tipo de Produto:", produtoInfo.productType);
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
        <div>
          <Input
            type="number"
            text="Ano de Lançamento Mínimo"
            name="minReleaseYear"
            placeholder="Ano de Lançamento Mínimo"
            handleOnChange={handleChange}
            value={produtoInfo.minReleaseYear}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Ano de Lançamento Máximo"
            name="maxReleaseYear"
            placeholder="Ano de Lançamento Máximo"
            handleOnChange={handleChange}
            value={produtoInfo.maxReleaseYear}
          />
        </div>
        <div>
          <label htmlFor="productType">Tipo de Produto:</label>
          <select
            id="productType"
            name="productType"
            onChange={(e) => handleChange("productType", e.target.value)}
            value={produtoInfo.productType}
          >
            <option value="">Selecione o Tipo</option>
            <option value="FELTRO">FELTRO</option>
            <option value="PANO">PANO</option>
            <option value="NATAL">NATAL</option>
            <option value="ESCOLAR">ESCOLAR</option>
            <option value="DECORACAO">DECORAÇÃO</option>
            <option value="LEMBRANCINHA">LEMBRANCINHA</option>
            <option value="FANTASIA">FANTASIA</option>
            <option value="PASCOA">PÁSCOA</option>
            <option value="FANTOCHES">FANTOCHES</option>
            <option value="DIVERSOS">DIVERSOS</option>
            <option value="CONSERTO">CONSERTO</option>
            <option value="QUIETBOOK">QUIET BOOK</option>
            <option value="BRINQUEDOS">BRINQUEDOS</option>
            <option value="PAPELARIA">PAPELARIA</option>
          </select>
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
