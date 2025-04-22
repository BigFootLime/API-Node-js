export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
  phone_number: string;
  departement: string;
  role: string;
  totpSecret?: string; // Added this property
  twoFactorEnabled: boolean;
}
  
  export interface RegisterUserDto {
    username: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    phone_number?: string;
    departement?: string;
    role?: string;
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }
  