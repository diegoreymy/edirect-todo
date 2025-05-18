export interface Task {
  id: number;
  description: string;
  completed: boolean;
  creationDate: string;
  finishDate?: string;
  projectId: number;
}
