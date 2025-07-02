import { Tresorerie } from "./Tresorerie";
import { User } from "./users";

export interface UserTresorerieObject {
    code: number;
    message: string;
    data: UserTresorerie[];
}

export interface UserTresorerie {
    id: number;
    utilisateurId: number;
    user:number;
    tresorerieId: number 
    created_at?: Date;
    setFieldValue: (field: string, value: any) => void;
}