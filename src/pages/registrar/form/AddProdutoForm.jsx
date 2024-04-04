import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const AddProdutoForm = () => {
  const [produtoInfo, setProdutoInfo] = useState({
    name: "",
    price: "",
    imgUrl: null,
    number: 0,
    releaseYear: null,
    productType: "", // Inicialize com uma string vazia
  });

  const handleChange = (name, value) => {
    setProdutoInfo({
      ...produtoInfo,
      [name]: value,
    });
  };

  const handleFileChange = (name, file) => {
    setProdutoInfo({
      ...produtoInfo,
      [name]: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Dados do produto:", produtoInfo);
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Erro na requisição: ${response.status} - ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do servidor:", data);
        alert("Produto adicionado com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
        alert("Produto adicionado com sucesso");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Produto"
            name="name"
            placeholder="Nome"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço do Produto"
            name="price"
            placeholder="Preço"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="file"
            text="Upload da Foto"
            name="imgUrl"
            handleOnChange={handleFileChange}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Número do Produto"
            name="number"
            placeholder="Número"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <label>Tipo de Produto:</label>
          <select
            name="productType"
            value={produtoInfo.productType}
            onChange={(e) => handleChange("productType", e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="FELTRO">FELTRO</option>
            <option value="PANO">PANO</option>
            <option value="NATAL">NATAL</option>
            <option value="ESCOLAR">ESCOLAR</option>
            <option value="DECORACAO">DECORACAO</option>
            <option value="LEMBRANCINHA">LEMBRANCINHA</option>
            <option value="FANTASIA">FANTASIA</option>
            <option value="PASCOA">PASCOA</option>
            <option value="FANTOCHES">FANTOCHES</option>
            <option value="DIVERSOS">DIVERSOS</option>
            <option value="CONSERTO">CONSERTO</option>
            <option value="QUIETBOOK">QUIETBOOK</option>
            <option value="BRINQUEDOS">BRINQUEDOS</option>
            <option value="PAPELARIA">PAPELARIA</option>
          </select>
        </div>
        <div>
          <Input
            type="number"
            text="Ano de Lançamento"
            name="releaseYear"
            placeholder="Ano de Lançamento"
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.fullWidth}>
        <button type="submit">Adicionar Produto</button>
      </div>
    </form>
  );
};

export default AddProdutoForm;
