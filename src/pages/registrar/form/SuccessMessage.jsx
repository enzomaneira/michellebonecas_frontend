import React, { useState } from "react";
import styles from "./SuccessMessage.module.css";

const SuccessMessage = ({ objectType }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div>
      {showMessage && (
        <div className={styles.message}>
          <p>{`${objectType} registrado com sucesso!`}</p>
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;
