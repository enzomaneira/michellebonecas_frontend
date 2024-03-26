import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";

function PedidoData() {
  const [totalSales, setTotalSales] = useState([]);
  const [rangeType, setRangeType] = useState('day');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchData();
  }, [rangeType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/totalSalesBy${rangeType}`);
      setTotalSales(response.data);
      setShowChart(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRangeChange = (type) => {
    setRangeType(type);
  };

  const options = {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories: totalSales.map(item => item.date)
    },
    yaxis: {
      title: {
        text: 'Valor Total de Vendas'
      }
    }
  };

  const series = [{
    name: 'Valor Total de Vendas',
    data: totalSales.map(item => item.totalSales)
  }];

  return (
    <Container>
      <div>
        <button onClick={() => handleRangeChange('day')}>Dia</button>
        <button onClick={() => handleRangeChange('month')}>Mês</button>
        <button onClick={() => handleRangeChange('year')}>Ano</button>
      </div>
      <button onClick={fetchData}>Gerar Gráfico</button>
      {showChart && <ApexChart options={options} series={series} type="line" />}
    </Container>
  );
}

export default PedidoData;
