import React, { FC } from "react";
import style from "./MyButton.module.css";
interface MyButtonProps {
  onClick: (value: any) => void;
  nameButton: string;
}
export const MyButton: FC<MyButtonProps> = ({ onClick, nameButton }) => {
  return (
    <div className={style.myButton}>
      <button onClick={() => onClick(false)}>{nameButton}</button>
    </div>
  );
};
