import React, { FC, useEffect, useState } from "react";
import style from "./SettingsItem.module.css";
import { MyButton } from "../MyButton/MyButton";
import { toDoListType } from "../../models/toDoListType";
import { MyTextarea } from "../MyTextarea/MyTextarea";
import { MySelect } from "../MySelect/MySelect";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { taskController } from "../../Controllers/TaskController";
import { Status } from "../Status/Status";

interface SettingsItemProps {
  item: toDoListType;
  toDoList: toDoListType[];
  setToDoList: (toDoList: toDoListType[]) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const SettingsItem: FC<SettingsItemProps> = ({
  item,
  toDoList,
  setToDoList,
  isOpen,
  setIsOpen,
}) => {
  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);
  const [status, setStatus] = useState<number>(item.status);
  const [statusResponse, setStatusResponse] = useState<number>(0);
  const selectOptions = [
    { value: 0, name: "Не выполненно" },
    { value: 1, name: "Выполняется" },
    { value: 2, name: "Выполненно" },
  ];

  const save = async () => {
    const response = await taskController.correctTask(item.id, {
      title,
      status,
      description,
    });
    setStatusResponse(response.status);

    setToDoList(
      toDoList.map((toDo) => {
        if (toDo.id === item.id) {
          return {
            id: item.id,
            title,
            description,
            status,
          };
        }
        return toDo;
      })
    );
    setIsOpen(false);
  };

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
  }, [item]);

  async function removeTask() {
    const response = await taskController.removeTask(item.id);
    setStatusResponse(response.status);
    if (response.status >= 200 && response.status < 300) {
      setToDoList(toDoList.filter((toDo) => toDo.id !== item.id));
      setIsOpen(false);
    }
  }

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
        <div className={style.statusTask}>
          <MySelect
            value={status}
            setValue={setStatus}
            options={selectOptions}
          />
          <MyButton nameButton="Удалить задание ❌" onClick={removeTask} />
        </div>

        <div className={style.myButton}>
          <MyButton onClick={save} nameButton="Сохранить изменения ✅" />
        </div>
      </ModalWindow>
      <Status status={statusResponse} setStatus={setStatusResponse} />
    </div>
  );
};
