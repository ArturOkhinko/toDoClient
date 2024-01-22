import React, { FC } from "react";
import style from "./MyTextarea.module.css";
interface MyTextareaProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}
export const MyTextarea: FC<MyTextareaProps> = ({
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className={style.myTextarea}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
