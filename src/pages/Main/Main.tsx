import React, { FC, useEffect, useMemo, useState } from "react";
import style from "./Main.module.css";
import { CreateItem } from "../../components/CreateItem/CreateItem";
import { MyButton } from "../../components/MyButton/MyButton";
import { Items } from "../../components/Items/Items";
import { toDoListType } from "../../models/toDoListType";
import { taskController } from "../../Controllers/TaskController";
export const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toDoList, setToDoList] = useState<toDoListType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchedToDoList = useMemo(() => {
    return toDoList.filter((item) => item.title.includes(title));
  }, [title, toDoList]);

  useEffect(() => {
    async function getTasks() {
      const tasks = await taskController.getTask();
      setToDoList(tasks.data.tasks);
    }
    setIsLoading(false);
    getTasks();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.topBar}>
        <input
          placeholder="Поиск задач"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={style.createItem}>
          <MyButton onClick={() => setIsOpen(true)} nameButton="Create ToDo" />
          <CreateItem
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setToDoList={setToDoList}
            toDoList={toDoList}
          />
        </div>
      </div>
      <div className={style.items}>
        <Items
          isLoading={isLoading}
          toDoList={searchedToDoList}
          setToDoList={setToDoList}
        />
        {isLoading ? <div>Загрузка</div> : undefined}
      </div>
    </div>
  );
};
