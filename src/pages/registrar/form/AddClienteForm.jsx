import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const AddClienteForm = () => {
  const [clienteInfo, setClienteInfo] = useState({
    name: "",
    contact: "",
  });

  const handleChange = (name, value) => {
    setClienteInfo({
      ...clienteInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do cliente:", clienteInfo);
    fetch("http://localhost:8080/clients", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteInfo),
    })
    .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erro na requisição: ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("Resposta do servidor:", data);
        })
        .catch((error) => {
          console.error("Erro ao processar resposta:", error);
        });

  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formContainer}`}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Cliente"
            name="name"
            placeholder="Nome"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="text"
            text="Contato do Cliente"
            name="contact"
            placeholder="Contato"
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.fullWidth}>
      <button type="submit">Adicionar Cliente</button>
      </div>
    </form>
  );
};

export default AddClienteForm;
