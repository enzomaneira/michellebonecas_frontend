import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarClienteForm = ({ onSubmit }) => {
  const [clienteInfo, setClienteInfo] = useState({
    nome: "",
    contato: "",
  });

  const handleChange = (name, value) => {
    setClienteInfo({
      ...clienteInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para buscar cliente com os dados fornecidos
    onSubmit(clienteInfo);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formContainer}`}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Cliente"
            name="nome"
            placeholder="Nome"
            handleOnChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="text"
            text="Contato do Cliente"
            name="contato"
            placeholder="Contato"
            handleOnChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.fullWidth}>
        <button type="submit" className={styles.button}>
          Buscar Cliente
        </button>
      </div>
    </form>
  );
};

export default BuscarClienteForm;
