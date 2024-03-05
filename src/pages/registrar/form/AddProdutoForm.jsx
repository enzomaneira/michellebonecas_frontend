import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "./Input";


const AddProdutoForm = () => {
  const [produtoInfo, setProdutoInfo] = useState({
    nome: "",
    preco: "",
    foto: null,
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
    // Lógica para enviar os dados do produto
    console.log("Dados do produto:", produtoInfo);
    // Limpar os campos ou redirecionar, conforme necessário
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
          />
        </div>
        <div>
          <Input
            type="number"
            text="Preço do Produto"
            name="preco"
            placeholder="Preço"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="file"
            text="Upload da Foto"
            name="foto"
            handleOnChange={handleFileChange}
          />
        </div>
      </div>
      <div className={styles.fullWidth}>
      <button type="submit">Adicionar Pedido</button>
      </div>
    </form>
  );
};

export default AddProdutoForm;
