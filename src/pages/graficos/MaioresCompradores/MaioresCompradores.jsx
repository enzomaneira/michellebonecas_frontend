import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";
import styles from "./MaioresCompradores.module.css";
import Navbar from "../../../components/Navbar";

function MaioresCompradores() {
  const [topBuyers, setTopBuyers] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clients/topBuyers`);
      setTopBuyers(response.data);
      setShowChart(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const options = {
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: topBuyers.map(client => client.name)
    },
    yaxis: {
      title: {
        text: 'Quantidade de Compras'
      }
    },
    legend: {
      labels: {
        colors: "#777",
        style: {
          fontSize: '14px'
        }
      }
    }
  };

  const series = [{
    name: 'Quantidade de Compras',
    data: topBuyers.map(client => client.count)
  }];

  return (
    <div>
      <Navbar/>
      <Container>
        {showChart && (
          <div className={styles.chartContainer}>
            <ApexChart options={options} series={series} type="bar" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default MaioresCompradores;
