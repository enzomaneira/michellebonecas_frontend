import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";

function ProdutosPercentage() {
  const [productData, setProductData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/percentage?minDate=${startDate}&maxDate=${endDate}`);
      setProductData(response.data);
      setShowChart(true); // Mostrar o gráfico após os dados serem carregados
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
    chart: {
      type: 'pie',
    },
    labels: productData.map(product => product.name),
  };

  const series = productData.map(product => product.percentage);

  return (
    <Container>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={fetchData}>Gerar Gráfico</button>
      {showChart && <ApexChart options={options} series={series} type="pie" />}
    </Container>
  );
}

export default ProdutosPercentage;
