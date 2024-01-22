import React, { FC } from "react";
import style from "./MySelect.module.css";

interface MySelectProps {
  options: { name: string; value: number }[];
  value: number;
  setValue: (value: number) => void;
}
export const MySelect: FC<MySelectProps> = ({ options, value, setValue }) => {
  return (
    <div className={style.mySelect}>
      <select value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
