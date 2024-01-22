import React, { FC, useState } from "react";
import { toDoListType } from "../../models/toDoListType";
import style from "./Items.module.css";
import { SettingsItem } from "../SettingsItem/SettingsItem";
import { taskController } from "../../Controllers/TaskController";
import { Status } from "../Status/Status";

interface ItemsProps {
  isLoading: boolean;
  toDoList: toDoListType[];
  setToDoList: (items: toDoListType[]) => void;
}
export const Items: FC<ItemsProps> = ({ toDoList, setToDoList, isLoading }) => {
  const [itemForSettings, setItemForSettings] = useState<toDoListType>({
    id: "",
    title: "",
    description: "",
    status: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<number>(0);
  const defineStatus = (status: number) => {
    if (status === 0) {
      return "Не выполнено";
    }
    if (status === 1) {
      return "Выполняется";
    }
    return "Выполненно";
  };
  const defineStyleForStatus = (status: number) => {
    if (status === 0) {
      return style.red;
    }
    if (status === 1) {
      return style.orange;
    }
    return style.green;
  };
  const changeStatus = async (id: string, status: number) => {
    const upgradeStatus = status === 2 ? 0 : status + 1;
    taskController.correctTask(id, {
      status: upgradeStatus,
    });
    setToDoList(
      toDoList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: upgradeStatus,
          };
        }
        return task;
      })
    );
  };
  const openSettings = (item: toDoListType) => {
    setItemForSettings(item);
    setIsOpen(true);
  };
  return (
    <div>
      {toDoList[0] ? (
        toDoList.map((item) => (
          <div key={item.id} className={style.item}>
            <div className={style.text}>
              <p className={style.title}>{item.title}</p>
              <p className={style.description}>{item.description}</p>
            </div>
            <div className={style.infoAboutTask}>
              <button
                className={style.settings}
                onClick={() => openSettings(item)}
              >
                ⚙️
              </button>
              <div
                className={`${style.status} ${defineStyleForStatus(
                  item.status
                )}`}
                onClick={() => changeStatus(item.id, item.status)}
              >
                <p>{defineStatus(item.status)}</p>
              </div>
            </div>
          </div>
        ))
      ) : isLoading === false ? (
        <div className={style.noSearched}>Ничего не найдено</div>
      ) : undefined}
      <SettingsItem
        item={itemForSettings}
        toDoList={toDoList}
        setToDoList={setToDoList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Status status={status} setStatus={setStatus} />
    </div>
  );
};
