import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import axios from 'axios';
import Container from '../../../components/Container';
import styles from "./PedidoData.module.css"
import Navbar from "../../../components/Navbar";

function PedidoData() {
  const [orders, setOrders] = useState([]);
  const [dates, setDates] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Erro ao buscar pedidos.');
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      processData();
    }
  }, [orders]);

  const processData = () => {
    const ordersByDate = orders.reduce((acc, order) => {
      const date = new Date(order.date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      acc[formattedDate] = acc[formattedDate] ? acc[formattedDate] + 1 : 1;
      return acc;
    }, {});

    const sortedDates = Object.keys(ordersByDate).sort((a, b) => new Date(a) - new Date(b));
    const ordersCountData = sortedDates.map(date => ordersByDate[date]);

    setDates(sortedDates);
    setOrdersCount(ordersCountData);
  };

  const options = {
    chart: { type: 'line', height: 400 },
    xaxis: { categories: dates },
    yaxis: { title: { text: 'Quantidade de Pedidos' } },
    tooltip: { x: { format: 'dd/MM/yyyy' } },
  };

  const series = [{ name: 'Pedidos', data: ordersCount.map((count, index) => ({ x: dates[index], y: count })) }];

  return (
  <div>
  <Navbar/>
    <Container>
      {error && <p>{error}</p>}
      {dates.length > 0 && ordersCount.length > 0 && (
      <div className={styles.chartContainer}>
        <ApexChart options={options} series={series} type="line" />
        </div>
      )}
    </Container>
    </div>
  );
}

export default PedidoData;
