import React, { FC, ReactNode } from "react";
import style from "./ModalWindow.module.css";
interface ModalWindowProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const ModalWindow: FC<ModalWindowProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div>
      {isOpen ? (
        <div className={style.mainModalWindow} onClick={() => setIsOpen(false)}>
          <div
            className={style.modalWindow}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};
