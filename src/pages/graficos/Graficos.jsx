import React from "react";
import styles from "./Graficos.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import GraficoPedidoCliente from "./PedidoCliente/GraficoPedidoCliente";

function Graficos() {
  return (
    <div>
      <Navbar />
      <Container>
        <div className={styles.menuContainer}>
          <div className={styles.menuColumn}>
            <Link to="/graficoPedidoCliente" className={styles.menuLink}>
              <div className={styles.menuItem}>Gráfico Pedido Cliente</div>
            </Link>
            <Link to="/graficoPedidoData" className={styles.menuLink}>
              <div className={styles.menuItem}>Gráfico Pedido Data</div>
            </Link>
            <Link to="/graficoPedidoProduto" className={styles.menuLink}>
              <div className={styles.menuItem}>Gráfico Pedido Produto</div>
            </Link>
          </div>
          <div className={styles.menuColumn}>
            <Link to="/graficoMaisVendidos" className={styles.menuLink}>
              <div className={styles.menuItem}>Gráfico Mais Vendidos</div>
            </Link>
            <Link to="/graficoProdutosPercentage" className={styles.menuLink}>
              <div className={styles.menuItem}>Gráfico Produtos Percentage</div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Graficos;
