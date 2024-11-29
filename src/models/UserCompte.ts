import { Tresorerie } from "./Tresorerie";
import { User } from "./users";

export interface UserCompteObject {
    code: number;
    message: string;
    data: UserCompte[];
}

export interface UserCompte {
    id: number;
    numCompte: string;
    utilisateurId: number;
    tresorerieId: number 
    created_at?: Date;
    setFieldValue: (field: string, value: any) => void;
}