export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  age: number;
  isAdmin?: boolean;
  isBlocked?: boolean;
}
