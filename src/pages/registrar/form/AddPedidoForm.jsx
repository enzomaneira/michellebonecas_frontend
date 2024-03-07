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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Desestruture os campos relevantes
    const { nomeCliente, data, produtos } = pedidoInfo;

    // Enviar campos separadamente
    try {
      // Enviar dados do cliente
      const clienteResponse = await fetch("http://localhost:8080/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nomeCliente, contact: "" }), // Substitua "" pelo valor adequado para "contact"
      });

      if (!clienteResponse.ok) {
        throw new Error(`Erro ao criar cliente: ${clienteResponse.status} - ${clienteResponse.statusText}`);
      }

      // Receber a resposta e extrair o ID do cliente, se necessário
      const clienteData = await clienteResponse.json();
      const clienteId = clienteData.id; // Substitua "id" pelo nome correto do campo

      // Enviar dados do pedido
      const pedidoResponse = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: data,
          client: { id: clienteId }, // Substitua "id" pelo nome correto do campo
          total: null, // Substitua null pelo valor adequado
          items: produtos.map((produto) => ({
            product: { id: null }, // Substitua "id" pelo nome correto do campo
            qtd: produto.quantidade,
            price: produto.preco,
          })),
        }),
      });

      if (!pedidoResponse.ok) {
        throw new Error(`Erro ao criar pedido: ${pedidoResponse.status} - ${pedidoResponse.statusText}`);
      }

      // Faça algo com a resposta do servidor, se necessário
      const pedidoData = await pedidoResponse.json();
      console.log("Resposta do servidor:", pedidoData);
    } catch (error) {
      console.error("Erro ao processar resposta:", error);
    }
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
