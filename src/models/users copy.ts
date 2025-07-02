
export interface UsersObject {
    code: number;
    message: string;
    data: User[];
  }
  export  interface User {
    id: number;
    nomComplet: string;
    telephone: string;
    sexe: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    role: Role;
    agence: Bureau;
    setFieldValue: (field: string, value: any) => void;
  }

  interface Role {
    id: number;
    nom: string;
    description: string;
    createdAt?: string;
  }

  interface Bureau {
    id: number;
    code: string;
    nom: string;
    address: string;
    type: string;
    telephone: string;
    email: string;
}
