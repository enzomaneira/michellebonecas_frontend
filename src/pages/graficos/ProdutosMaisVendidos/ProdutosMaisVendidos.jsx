import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";

function ProdutosMaisVendidos() {
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/topSelling?minDate=${startDate}&maxDate=${endDate}`);
      setTopProducts(response.data);
      setShowChart(true); // Mostrar o gráfico após os dados serem carregados
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: topProducts.map(product => product.name)
    },
    yaxis: {
      title: {
        text: 'Quantidade Vendida'
      }
    }
  };

  const series = [{
    name: 'Quantidade Vendida',
    data: topProducts.map(product => product.quantity)
  }];

  return (
    <Container>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={fetchData}>Gerar Gráfico</button>
      {showChart && <ApexChart options={options} series={series} type="bar" />}
    </Container>
  );
}

export default ProdutosMaisVendidos;
