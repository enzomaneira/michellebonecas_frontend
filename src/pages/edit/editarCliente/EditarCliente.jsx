import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Container from "../../../components/Container";
import styles from "./EditarCliente.module.css";
import Input from "../../../components/Input";
import NavbarEditar from "../NavbarEditar";

const EditarCliente = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [clientInfo, setClientInfo] = useState({
    number: 0,
    name: "",
    where: "",
    contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/clients/findByNumber?number=${searchNumber}`
      );
      if (!response.ok) {
        throw new Error("Cliente não encontrado");
      }
      const data = await response.json();
      setClientInfo(data);
      setIsEditing(true);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error.message);
      alert("Cliente não encontrado");
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updateUrl = `http://localhost:8080/clients/${clientInfo.id}`;
    console.log("URL de atualização:", updateUrl);
    console.log("JSON enviado para atualização:", JSON.stringify(clientInfo));

    try {
      await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientInfo),
      });
      alert("Cliente atualizado com sucesso");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error.message);
      alert("Erro ao atualizar cliente");
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/clients/${clientInfo.id}`, {
        method: "DELETE",
      });
      alert("Cliente deletado com sucesso");
      setIsEditing(false);
      setClientInfo({
        number: 0,
        name: "",
        where: "",
        contact: "",
      });
    } catch (error) {
      console.error("Erro ao deletar cliente:", error.message);
      alert("Erro ao deletar cliente");
    }
  };

  const handleChange = (name, value) => {
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        <NavbarEditar />
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            type="number"
            text="Buscar Cliente por Número"
            name="searchNumber"
            placeholder="Número"
            value={searchNumber}
            handleOnChange={(name, value) => setSearchNumber(value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {isEditing && (
          <form onSubmit={handleUpdate} className={styles.formContainer}>
            <div className={styles.column}>
              <div>
                <Input
                  type="text"
                  text="Nome do Cliente"
                  name="name"
                  placeholder={clientInfo.name}
                  value={clientInfo.name}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  text="Da onde conheceu o cliente"
                  name="where"
                  placeholder={clientInfo.where}
                  value={clientInfo.where}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  text="Contato do Cliente"
                  name="contact"
                  placeholder={clientInfo.contact}
                  value={clientInfo.contact}
                  handleOnChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="number"
                  text="Número do Cliente"
                  name="number"
                  placeholder={clientInfo.number.toString()}
                  value={clientInfo.number}
                  handleOnChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.fullWidth}>
              <button type="submit">Salvar Alterações</button>
              <button onClick={handleDelete} type="button">
                Deletar Cliente
              </button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};

export default EditarCliente;
