import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./EditarProduto.module.css";
import Input from "../../../components/Input";
import NavbarEditar from "../NavbarEditar";

const EditarProduto = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [produtoInfo, setProdutoInfo] = useState({
    name: "",
    price: "",
    imgUrl: null,
    number: 0,
    releaseYear: null,
    productType: "",
  });

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/products/findByNumber?number=${searchNumber}`
      );
      if (!response.ok) {
        throw new Error("Produto não encontrado");
      }
      const data = await response.json();
      setProdutoInfo(data);
    } catch (error) {
      console.error("Erro ao buscar produto:", error.message);
      alert("Produto não encontrado");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/products/${produtoInfo.id}`, {
        method: "DELETE",
      });
      alert("Produto deletado com sucesso");
      setProdutoInfo({
        name: "",
        price: "",
        imgUrl: null,
        number: 0,
        releaseYear: null,
        productType: "",
      });
    } catch (error) {
      console.error("Erro ao deletar produto:", error.message);
      alert("Erro ao deletar produto");
    }
  };

  const handleChange = (name, value) => {
    setProdutoInfo({
      ...produtoInfo,
      [name]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updateUrl = `http://localhost:8080/products/${produtoInfo.id}`;
    console.log("URL de atualização:", updateUrl);
    console.log("JSON enviado para atualização:", JSON.stringify(produtoInfo));

    try {
      await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoInfo),
      });
      alert("Produto atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error.message);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarEditar />
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            type="number"
            text="Buscar Produto por Número"
            name="searchNumber"
            placeholder="Número"
            value={searchNumber}
            handleOnChange={(name, value) => setSearchNumber(value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {produtoInfo.number !== 0 && (
          <form className={styles.formContainer}>
            <div className={styles.column}>
              <div>
                <Input
                  type="text"
                  text="Nome do Produto"
                  name="name"
                  placeholder={produtoInfo.name}
                  value={produtoInfo.name}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="number"
                  text="Preço do Produto"
                  name="price"
                  placeholder={produtoInfo.price}
                  value={produtoInfo.price}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="file"
                  text="Upload da Foto"
                  name="imgUrl"
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="number"
                  text="Número do Produto"
                  name="number"
                  placeholder={produtoInfo.number.toString()}
                  value={produtoInfo.number}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <label>Tipo de Produto:</label>
                <select
                  name="productType"
                  value={produtoInfo.productType}
                  onChange={(e) => handleChange("productType", e.target.value)}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="FELTRO">FELTRO</option>
                  <option value="PANO">PANO</option>
                  <option value="NATAL">NATAL</option>
                  <option value="ESCOLAR">ESCOLAR</option>
                  <option value="DECORACAO">DECORACAO</option>
                  <option value="LEMBRANCINHA">LEMBRANCINHA</option>
                  <option value="FANTASIA">FANTASIA</option>
                  <option value="PASCOA">PASCOA</option>
                  <option value="FANTOCHES">FANTOCHES</option>
                  <option value="DIVERSOS">DIVERSOS</option>
                  <option value="CONSERTO">CONSERTO</option>
                  <option value="QUIETBOOK">QUIETBOOK</option>
                  <option value="BRINQUEDOS">BRINQUEDOS</option>
                  <option value="PAPELARIA">PAPELARIA</option>
                </select>
              </div>
              <div>
                <Input
                  type="number"
                  text="Ano de Lançamento"
                  name="releaseYear"
                  placeholder={produtoInfo.releaseYear}
                  value={produtoInfo.releaseYear}
                  handleOnChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.fullWidth}>
              <button type="button" onClick={handleUpdate}>
                Salvar Alterações
              </button>
              <button onClick={handleDelete} type="button">
                Deletar Produto
              </button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};

export default EditarProduto;
