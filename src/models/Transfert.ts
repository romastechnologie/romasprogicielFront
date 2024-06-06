import { Tresorerie } from "./Tresorerie";

export interface TransfertObject {
    code: number;
    message: string;
    data: Transfert[];
}

export interface Transfert {
    id?: string
    source?: string
    destination?: string
    montant?: number
    tresorerie?: Tresorerie
    tresorerie2?: Tresorerie
    created_at?: Date;
    setFieldValue: (field: string, value: any) => void;
}