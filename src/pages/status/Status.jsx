import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import styles from "./Status.module.css";

function Status() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [statusAtualizado, setStatusAtualizado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/orders");
        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos.");
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        setError("Erro ao buscar pedidos: " + error.message);
      }
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  const handleStatusChange = async () => {
    if (!pedidoSelecionado || !statusAtualizado || !dataSelecionada) {
      setError("Selecione um pedido, um novo status e uma data.");
      return;
    }
    try {
      const url = `http://localhost:8080/orders/${pedidoSelecionado.id}/status?status=${statusAtualizado}&date=${dataSelecionada}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar status do pedido.");
      }
      setError(null);
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === pedidoSelecionado.id
            ? { ...pedido, orderStatus: statusAtualizado }
            : pedido
        )
      );

      setPedidoSelecionado(null);
      setStatusAtualizado("");
      setDataSelecionada("");
    } catch (error) {
      setError("Erro ao atualizar status do pedido: " + error.message);
    }
  };


  const handlePedidoChange = (e) => {
    const pedidoId = e.target.value;
    const pedido = pedidos.find((pedido) => pedido.id === pedidoId);
    setPedidoSelecionado(pedido);
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <h1>Status do Pedido</h1>
        {error && <div className={styles.error}>{error}</div>}
        <div>
          <select onChange={handlePedidoChange}>
            <option value="">Selecione um pedido</option>
            {pedidos.map((pedido) => (
              <option key={pedido.id} value={pedido.id}>
                Pedido #{pedido.number} - Status: {pedido.orderStatus}
              </option>
            ))}
          </select>
          {pedidoSelecionado && (
            <div>
              <div>Pedido Selecionado: #{pedidoSelecionado.number}</div>
              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
              />
              <select
                value={statusAtualizado}
                onChange={(e) => setStatusAtualizado(e.target.value)}
              >
                <option value="">Selecione um novo status</option>
                <option value="1">ESPERA</option>
                <option value="2">EM CONFECCAO</option>
                <option value="3">PRONTO</option>
                <option value="4">ENTREGUE</option>
                <option value="5">PAGO</option>
              </select>
              <button onClick={handleStatusChange}>Confirmar Mudança de Status</button>
            </div>
          )}
        </div>
        {loading && <div>Carregando...</div>}
      </Container>
    </div>
  );
}

export default Status;
