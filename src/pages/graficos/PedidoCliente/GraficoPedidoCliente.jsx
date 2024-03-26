import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import axios from 'axios';
import Container from '../../../components/Container';
import Navbar from "../../../components/Navbar";
import styles from "./GraficoPedidoCliente.module.css"

function GraficoPedidoCliente() {
  const [clientData, setClientData] = useState([]);
  const [dates, setDates] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/clients');
      setClientData(response.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
      setError('Erro ao buscar dados do cliente.');
    }
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  useEffect(() => {
    if (selectedClient) {
      fetchSalesData();
    }
  }, [selectedClient]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orders/fullSearch?client=${selectedClient}`);
      processData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Erro ao buscar dados de vendas.');
    }
  };

  const processData = (salesData) => {
    const dates = salesData.map(sale => new Date(sale.date));
    const formattedDates = dates.map(date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    const totalSales = salesData.map(sale => sale.total);

    setDates(formattedDates);
    setTotalSales(totalSales);
  };

  const options = {
    chart: { type: 'line', height: 400 },
    xaxis: { categories: dates },
    yaxis: { title: { text: 'Dinheiro Gasto' } },
    tooltip: { x: { format: 'dd/MM/yyyy' } },
  };

  const series = [{ name: 'R$', data: totalSales }];

  return (
    <div>
      <Navbar />
      <Container>
        {error && <p>{error}</p>}
        {clientData.length > 0 && (
          <div>
            <label htmlFor="clientSelect">Selecione o cliente:</label>
            <select id="clientSelect" onChange={handleClientChange}>
              <option value="">Selecione...</option>
              {clientData.map(client => (
                <option key={client.id} value={client.name}>{client.name}</option>
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

export default GraficoPedidoCliente;
