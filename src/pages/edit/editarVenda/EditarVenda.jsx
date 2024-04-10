import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./EditarVenda.module.css";
import Input from "../../../components/Input";
import NavbarEditar from "../NavbarEditar";

const EditarVenda = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [vendaInfo, setVendaInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/orders/findByNumber?number=${searchNumber}`
      );
      if (!response.ok) {
        throw new Error("Venda não encontrada");
      }
      const data = await response.json();
      setVendaInfo(data);
      setIsEditing(true);
    } catch (error) {
      console.error("Erro ao buscar venda:", error.message);
      alert("Venda não encontrada");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/orders/${vendaInfo.id}`, {
        method: "DELETE",
      });
      alert("Venda deletada com sucesso");
      setIsEditing(false);
      setVendaInfo(null);
    } catch (error) {
      console.error("Erro ao deletar venda:", error.message);
      alert("Erro ao deletar venda");
    }
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarEditar />
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            type="number"
            text="Buscar Pedido por Número"
            name="searchNumber"
            placeholder="Número"
            value={searchNumber}
            handleOnChange={(name, value) => setSearchNumber(value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {isEditing && vendaInfo && (
          <div className={styles.infoContainer}>
            <h2>Informações da Venda:</h2>
            <div key={vendaInfo.id} className={styles.vendaItem}>
              <div className={styles.vendaItemRow}>
                <p>Número: {vendaInfo.number}</p>
                <p>Cliente: {vendaInfo.client.name}</p>
              </div>
              <div className={styles.vendaItemRow}>
                <p>Data da Venda: {vendaInfo.date}</p>
                <p>Total da Venda: R$ {vendaInfo.total}</p>
              </div>
              <div className={styles.vendaItemRow}>
                <p>Data Inicial: {vendaInfo.dateInit}</p>
                <p>Data Final: {vendaInfo.dateEnd}</p>
              </div>
              <div className={styles.vendaItemRow}>
                <p>Data de Entrega: {vendaInfo.dateDeliver}</p>
                <p>Data de Pagamento: {vendaInfo.datePayment}</p>
              </div>
              <h4>Itens da Venda:</h4>
              <ul>
                {vendaInfo.items.map((item) => (
                  <li key={item.id}>
                    <div className={styles.itemInfo}>
                      <p>Produto: {item.product.name}</p>
                      <p>Preço Unitário: R$ {item.product.price}</p>
                      <p>Quantidade: {item.qtd}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleDelete}>Confirmar Deleção</button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default EditarVenda;
