export interface User {
  id: number;
  username: string;
  password: string;
  projects?: any[];
}

export interface UserDTO {
  id: number;
  username: string;
}