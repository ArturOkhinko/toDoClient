import React, { FC, useState } from "react";
import style from "./CreateItem.module.css";
import { MyButton } from "../MyButton/MyButton";
import { MyTextarea } from "../MyTextarea/MyTextarea";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { taskController } from "../../Controllers/TaskController";
import { toDoListType } from "../../models/toDoListType";
import { Status } from "../Status/Status";
interface CreateItemProps {
  setToDoList: (toDoList: toDoListType[]) => void;
  toDoList: toDoListType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const CreateItem: FC<CreateItemProps> = ({
  isOpen,
  setIsOpen,
  setToDoList,
  toDoList,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const createItem = async () => {
    const response = await taskController.createTask(title, description);
    setStatus(response.status);
    setToDoList([
      ...toDoList,
      { id: response.data.id, title, description, status: 0 },
    ]);
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <div>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={style.textareas}>
          <MyTextarea
            placeholder="Заголовок"
            value={title}
            setValue={setTitle}
          />
          <MyTextarea
            placeholder="Описание"
            value={description}
            setValue={setDescription}
          />
        </div>
        <div className={style.myButton}>
          <MyButton onClick={createItem} nameButton="Готово" />
        </div>
      </ModalWindow>
      <Status status={status} setStatus={setStatus} />
    </div>
  );
};
