import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultadoBuscaProduto = () => {
  const { query } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const searchUrl = `http://localhost:8080/products/search?${query}`;
        console.log("URL de busca:", searchUrl); // Console log para imprimir a URL
        const response = await fetch(searchUrl);
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
          setError(null); // Resetar o estado de erro se a busca for bem-sucedida
        } else {
          setError("Erro ao buscar produtos:" + response.statusText);
        }
      } catch (error) {
        setError("Erro ao buscar produtos:" + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, [query]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (produtos.length === 0) {
    return <div>Nenhum produto encontrado.</div>;
  }

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
