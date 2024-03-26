import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import axios from 'axios';
import Container from '../../../components/Container';
import Navbar from "../../../components/Navbar";
import styles from "./PedidoProduto.module.css"

function PedidoProduto() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [dates, setDates] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Erro ao buscar produtos.');
    }
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchSalesData();
    }
  }, [selectedProduct]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/fullSearch?product=${selectedProduct}`);
      processData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Erro ao buscar dados de vendas.');
    }
  };

  const processData = (salesData) => {
    const dates = salesData.map(sale => new Date(sale.date));
    const formattedDates = dates.map(date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    const totalSales = salesData.map(sale => {
      const orderItem = sale.items.find(item => item.product.name === selectedProduct);
      return orderItem ? orderItem.subTotal : 0;
    });

    setDates(formattedDates);
    setTotalSales(totalSales);
  };

  const options = {
    chart: { type: 'line', height: 400 },
    xaxis: { categories: dates },
    yaxis: { title: { text: 'Dinheiro Arrecadado' } },
    tooltip: { x: { format: 'dd/MM/yyyy' } },
  };

  const series = [{ name: 'R$', data: totalSales }];

  return (
    <div>
      <Navbar />
      <Container>
        {error && <p>{error}</p>}
        {products.length > 0 && (
          <div>
            <label htmlFor="productSelect">Selecione o produto:</label>
            <select id="productSelect" onChange={handleProductChange}>
              <option value="">Selecione...</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>
        )}
        {dates.length > 0 && totalSales.length > 0 && (
          <div className={styles.chartContainer}>
            <ApexChart options={options} series={series} type="line" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default PedidoProduto;
