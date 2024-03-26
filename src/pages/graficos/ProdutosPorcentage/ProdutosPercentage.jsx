import React, { useState, useEffect } from 'react';
import ApexChart from "react-apexcharts";
import axios from 'axios';
import Container from "../../../components/Container";
import styles from "./ProdutosPercentage.module.css"
import Navbar from "../../../components/Navbar";

function ProdutosPercentage() {
  const [products, setProducts] = useState([]);
  const [productPercentages, setProductPercentages] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
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

  useEffect(() => {
    if (products.length > 0) {
      calculatePercentages();
    }
  }, [products]);

  const calculatePercentages = () => {
    const total = products.reduce((acc, product) => acc + product.countMoney, 0);
    setTotalMoney(total);

    const percentages = products.map(product => ({
      name: product.name,
      y: (product.countMoney / total) * 100,
    }));
    setProductPercentages(percentages);
  };

  const options = {
    chart: { type: 'pie' },
    labels: productPercentages.map(item => item.name),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
  };

  const series = productPercentages.map(item => item.y);

  return (
  <div>
  <Navbar/>
    <Container>
      {error && <p>{error}</p>}
      {products.length > 0 && (
      <div className={styles.chartContainer}>
        <ApexChart options={options} series={series} type="pie"/>
       </div>
      )}
    </Container>
   </div>
  );
}

export default ProdutosPercentage;
