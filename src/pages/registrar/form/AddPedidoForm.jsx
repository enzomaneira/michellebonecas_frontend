import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const AddPedidoForm = () => {
  const [pedidoInfo, setPedidoInfo] = useState({
    nomeCliente: "",
    data: "",
    produtos: [
      {
        nomeProduto: "",
        quantidade: "",
        preco: "",
      },
    ],
  });

  const handleChange = (name, value, index) => {
    if (index !== undefined) {
      const updatedProdutos = [...pedidoInfo.produtos];
      updatedProdutos[index][name] = value;

      setPedidoInfo({
        ...pedidoInfo,
        produtos: updatedProdutos,
      });
    } else {
      setPedidoInfo({
        ...pedidoInfo,
        [name]: value,
      });
    }
  };

  const handleAddProduto = () => {
    setPedidoInfo({
      ...pedidoInfo,
      produtos: [
        ...pedidoInfo.produtos,
        {
          nomeProduto: "",
          quantidade: "",
          preco: "",
        },
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do pedido
    console.log("Dados do pedido:", pedidoInfo);
    // Limpar os campos ou redirecionar, conforme necessário
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formContainer}`}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Cliente"
            name="nomeCliente"
            placeholder="Nome do Cliente"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="date"
            text="Data"
            name="data"
            placeholder="Data"
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.column}>
        {pedidoInfo.produtos.map((produto, index) => (
          <div key={index}>
            <Input
              type="text"
              text={`Nome do Produto ${index + 1}`}
              name="nomeProduto"
              placeholder="Nome do Produto"
              handleOnChange={(name, value) => handleChange(name, value, index)}
            />
            <Input
              type="number"
              text={`Quantidade do Produto ${index + 1}`}
              name="quantidade"
              placeholder="Quantidade"
              handleOnChange={(name, value) => handleChange(name, value, index)}
            />
            <Input
              type="number"
              text={`Preço do Produto ${index + 1}`}
              name="preco"
              placeholder="Preço"
              handleOnChange={(name, value) => handleChange(name, value, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduto}>
          Adicionar Produto
        </button>
      </div>
      <div className={styles.fullWidth}>
        <button type="submit">Adicionar Pedido</button>
      </div>
    </form>
  );
};

export default AddPedidoForm;
