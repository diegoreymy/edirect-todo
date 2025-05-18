export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  creationDate: string;
  finishDate?: string;
  projectId: number;
}
