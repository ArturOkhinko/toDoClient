import { AxiosResponse } from "axios";
import $api from "../http/API";
import { toDoListType } from "../models/toDoListType";
import { GetTasksResponse } from "../models/tasksApi/getTasksResponse";
import { CreateTaskResponse } from "../models/tasksApi/createTaskResponse";

type toDoCorrectType = {
  title?: string;
  description?: string;
  status?: number;
};

class TaskController {
  static async getTask(): Promise<AxiosResponse<GetTasksResponse>> {
    return $api.get<GetTasksResponse>("/getTasks");
  }
  static async createTask(
    title: string,
    description: string
  ): Promise<AxiosResponse<CreateTaskResponse>> {
    return $api.post<CreateTaskResponse>("/createTask", { title, description });
  }
  static async removeTask(id: string): Promise<AxiosResponse> {
    return $api.delete("/removeTask", { data: { id } });
  }
  static async correctTask(id: string, task: toDoCorrectType) {
    return $api.put("/correctTask", { id, task });
  }
}

export const taskController = TaskController;
