export interface User {
    id: string;
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface RegisterUserDto {
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
  