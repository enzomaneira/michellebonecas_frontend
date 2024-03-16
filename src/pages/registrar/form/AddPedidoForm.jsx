import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const AddPedidoForm = () => {
  const [formData, setFormData] = useState({
    nomeCliente: "",
    data: "",
    produtos: [{ idProduto: "", quantidade: 0, preco: 0, name: "", imgUrl: "" }],
  });

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchClientes();
    fetchProdutos();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/clients");
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
      } else {
        console.error("Erro ao buscar clientes:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      } else {
        console.error("Erro ao buscar produtos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    }
  };

  const createOrderItem = async (orderItemData) => {
    try {
      const response = await fetch("http://localhost:8080/orderItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItemData),
      });

      if (response.ok) {
        const orderItem = await response.json();
        console.log("OrderItem criado com sucesso:", orderItem);
        return orderItem;
      } else {
        console.error("Erro ao criar OrderItem:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Erro ao criar OrderItem:", error.message);
      return null;
    }
  };

  const handleChange = (name, value, index) => {
    const newProdutos = [...formData.produtos];
    if (name === "idProduto") {
      newProdutos[index].idProduto = value;
      const selectedProduct = produtos.find((produto) => produto.id === value);
      if (selectedProduct) {
        newProdutos[index].name = selectedProduct.name;
        newProdutos[index].preco = selectedProduct.price;
        newProdutos[index].imgUrl = selectedProduct.imgUrl;
      }
    } else {
      newProdutos[index][name] = value;
    }
    setFormData({ ...formData, produtos: newProdutos });
  };

  const handleAddProduto = () => {
    const newProdutos = [
      ...formData.produtos,
      { idProduto: "", quantidade: 0, preco: 0, name: "", imgUrl: "" },
    ];
    setFormData({ ...formData, produtos: newProdutos });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar se um cliente foi selecionado
    if (!formData.nomeCliente) {
      console.error("Selecione um cliente antes de enviar o pedido.");
      return;
    }

    // Buscar informações do cliente selecionado pelo nome
    const selectedClient = clientes.find(
      (cliente) => cliente.name === formData.nomeCliente
    );

    // Criar OrderItems
    const orderItems = await Promise.all(
      formData.produtos.map(async (produto) => {
        const orderItemData = {
          product: {
            id: produto.idProduto,
            name: produto.name,
            price: produto.preco,
            imgUrl: produto.imgUrl,
          },
          price: produto.preco,
          qtd: produto.quantidade,
        };
        return createOrderItem(orderItemData);
      })
    );

    if (!orderItems || orderItems.some((item) => item === null)) {
      console.error("Erro ao criar OrderItems.");
      return;
    }

    const requestBody = {
      date: formData.data,
      client: {
        id: selectedClient.id,
        name: selectedClient.name,
        contact: selectedClient.contact,
      },
      items: orderItems,
    };

    console.log("JSON enviado para o backend:", JSON.stringify(requestBody));

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Pedido adicionado com sucesso!");
        // Limpar formulário ou exibir mensagem de sucesso
      } else {
        console.error("Erro ao adicionar pedido:", response.statusText);
        // Exibir mensagem de erro ao usuário
      }
    } catch (error) {
      console.error("Erro ao adicionar pedido:", error.message);
      // Exibir mensagem de erro ao usuário
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${styles.formContainer}`}
    >
      <div className={styles.column}>
        <div>
          <label htmlFor="clienteSelect">Selecione o Cliente:</label>
          <select
            id="clienteSelect"
            name="nomeCliente"
            onChange={(e) =>
              setFormData({ ...formData, nomeCliente: e.target.value })
            }
            value={formData.nomeCliente}
          >
            <option value="">Selecione...</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.name}>
                {cliente.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Input
            type="date"
            text="Data"
            name="data"
            placeholder="Data"
            handleOnChange={(name, value) =>
              setFormData({ ...formData, [name]: value })
            }
          />
        </div>
      </div>
      <div className={styles.column}>
        {formData.produtos.map((produto, index) => (
          <div key={index}>
            <label htmlFor={`produtoSelect${index}`}>
              Selecione o Produto {index + 1}:
            </label>
            <select
              id={`produtoSelect${index}`}
              name={`idProduto`}
              onChange={(e) => handleChange("idProduto", e.target.value, index)}
              value={produto.idProduto}
            >
              <option value="">Selecione...</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.name}
                </option>
              ))}
            </select>
            <Input
              type="number"
              text={`Quantidade`}
              name={`quantidade`}
              placeholder="Quantidade"
              handleOnChange={(name, value) => handleChange(name, value, index)}
            />
            <Input
              type="number"
              text={`Preço`}
              name={`preco`}
              placeholder="Preço"
              handleOnChange={(name, value) => handleChange(name, value, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduto}>
          Adicionar Produto
        </button>
        <button type="submit">Enviar Pedido</button>
      </div>
    </form>
  );
};

export default AddPedidoForm;
