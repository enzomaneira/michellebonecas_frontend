import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import styles from './GraficoPedidoCliente.module.css';
import Container from "../../../components/Container";

function GraficoPedidoCliente() {
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientsList, setClientsList] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clients');
      setClientsList(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/fullSearch?client=${selectedClient}&minDate=${startDate}&maxDate=${endDate}`);
      setClientData(response.data);
      setShowChart(true);
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
    name: 'Quantidade de Pedidos',
    data: clientData.map(order => ({
      x: new Date(order.date).getTime(),
      y: order.quantity
    }))
  }];

  return (
    <Container>
      <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
        <option value="">Selecione o cliente</option>
        {clientsList.map(client => (
          <option key={client.id} value={client.id}>{client.name}</option>
        ))}
      </select>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleGenerateChart}>Gerar Gráfico</button>
      {showChart && <ApexChart options={options} series={series} type="line" />}
    </Container>
  );
}

export default GraficoPedidoCliente;
