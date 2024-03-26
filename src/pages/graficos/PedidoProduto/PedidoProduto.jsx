import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";

function PedidoProduto() {
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProductsList(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/productSales?product=${selectedProduct}&minDate=${startDate}&maxDate=${endDate}`);
      setProductData(response.data);
      setShowChart(true); // Mostrar o gráfico após os dados serem carregados
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGenerateChart = () => {
    fetchData();
  };

  const options = {
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltips: {
        enabled: true
      }
    }
  };

  const series = [{
    data: productData.map(order => ({
      x: new Date(order.date).getTime(),
      y: order.quantity
    }))
  }];

  return (
    <Container>
      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">Selecione o produto</option>
        {productsList.map(product => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleGenerateChart}>Gerar Gráfico</button>
      {showChart && <ApexChart options={options} series={series} type="line" />}
    </Container>
  );
}

export default PedidoProduto;
