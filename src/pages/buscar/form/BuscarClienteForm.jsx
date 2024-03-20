// BuscarClienteForm.jsx
import React, { useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../components/Input";

const BuscarClienteForm = ({ onSubmit }) => {
  const [clienteInfo, setClienteInfo] = useState({
    nome: "",
    contato: "",
    minCompras: "",
    maxCompras: "",
    minValorCompras: "",
    maxValorCompras: "",
  });

  const handleChange = (name, value) => {
    setClienteInfo({
      ...clienteInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(clienteInfo);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column}>
        <div>
          <Input
            type="text"
            text="Nome do Cliente"
            name="nome"
            placeholder="Nome"
            handleOnChange={handleChange}
            value={clienteInfo.nome}
          />
        </div>
        <div>
          <Input
            type="text"
            text="Contato do Cliente"
            name="contato"
            placeholder="Contato"
            handleOnChange={handleChange}
            value={clienteInfo.contato}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Mínimo de Compras"
            name="minCompras"
            placeholder="Mínimo de Compras"
            handleOnChange={handleChange}
            value={clienteInfo.minCompras}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Máximo de Compras"
            name="maxCompras"
            placeholder="Máximo de Compras"
            handleOnChange={handleChange}
            value={clienteInfo.maxCompras}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Mínimo Valor de Compras"
            name="minValorCompras"
            placeholder="Mínimo Valor de Compras"
            handleOnChange={handleChange}
            value={clienteInfo.minValorCompras}
          />
        </div>
        <div>
          <Input
            type="number"
            text="Máximo Valor de Compras"
            name="maxValorCompras"
            placeholder="Máximo Valor de Compras"
            handleOnChange={handleChange}
            value={clienteInfo.maxValorCompras}
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
