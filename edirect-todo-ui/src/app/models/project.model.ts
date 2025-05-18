import { Task } from "./task.model";

export interface Project {
  id: number;
  name: string;
  tasks?: Task[];
}