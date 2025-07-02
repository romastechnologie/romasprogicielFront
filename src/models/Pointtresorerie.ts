import { Tresorerie } from "./Tresorerie";
import { Personnel } from "./Personnel";

export interface PointtresorerieObject {
    code: number;
    message: string;
    data: Pointtresorerie[];
}

export interface Pointtresorerie {
    id: number;
    personnelId: number;
    dateDebut: Date;
    dateFin: Date;
    dateExecution: Date;
    montant: number;
    montantvisible: number;
    tresorerieId: number ;
    created_at?: Date;
    setFieldValue: (field: string, value: any) => void;
}