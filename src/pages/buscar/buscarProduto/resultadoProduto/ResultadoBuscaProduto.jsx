import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultadoBuscaProduto = () => {
  const { query } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/search?name=${query}`);
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        } else {
          console.error("Erro ao buscar produtos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
      }
    };
    fetchProdutos();
  }, [query]);

  return (
    <div>
      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.name}</h3>
          <p>Preço: R$ {produto.price}</p>
          <img src={produto.imgUrl} alt={produto.name} />
        </div>
      ))}
    </div>
  );
};

export default ResultadoBuscaProduto;
