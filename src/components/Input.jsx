import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, text, name, placeholder, handleOnChange, value, options, index }) => {
  const optionsArray = Array.isArray(options) ? options : [];
  const handleChange = (event) => {
    if (type === "number") {
      const inputValue = parseFloat(event.target.value);
      const minValue = parseFloat(event.target.min);
      const maxValue = parseFloat(event.target.max);

      if (!isNaN(inputValue) && inputValue >= minValue && inputValue <= maxValue) {
        handleOnChange(name, inputValue, index);
      }
    } else {
      handleOnChange(name, event.target.value, index);
    }
  };

  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      {type === "select" ? (
        <select name={name} id={name} className={styles.select} onChange={handleChange} value={value}>
          <option>Selecione uma opção</option>
          {optionsArray.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          min={type === "number" ? "0" : undefined}
          max={type === "number" ? "100000s" : undefined}
          step={type === "number" ? "0.1" : undefined}
        />
      )}
    </div>
  );
};

export default Input;
