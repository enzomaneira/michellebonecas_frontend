import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "./Input";

const AddClienteForm = () => {
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
    // Lógica para enviar os dados do cliente
    console.log("Dados do cliente:", clienteInfo);
    // Limpar os campos ou redirecionar, conforme necessário
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
      <button type="submit">Adicionar Pedido</button>
      </div>
    </form>
  );
};

export default AddClienteForm;
