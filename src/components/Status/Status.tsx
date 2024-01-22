import React, { FC, useEffect, useState } from "react";
import style from "./Status.module.css";

interface StatusProps {
  status: number;
  setStatus: (status: number) => void;
  message?: string;
}
export const Status: FC<StatusProps> = ({ status, message, setStatus }) => {
  useEffect(() => {
    if (status !== 0) {
      setTimeout(() => setStatus(0), 2000);
    }
  }, [status]);
  const createMessage = () => {
    if (message) {
      return message;
    }
    if (status >= 200 && status <= 300) {
      return "Успешно";
    }
    return "Ошибка";
  };

  const defineColor = () => {
    if (status >= 200 && status <= 300) {
      return style.ok;
    }
    return style.error;
  };

  return (
    <div className={style.status}>
      {status !== 0 ? (
        <div className={style.message + " " + defineColor()}>
          <p>{createMessage()}</p>
        </div>
      ) : undefined}
    </div>
  );
};
