
export interface IUser {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
export type UserList = IUser[];
