import { Tresorerie } from "./Tresorerie"

export interface OuvFerObject {
    code: number;
    message: string;
    data: OuvFer[];
}

export interface OuvFer {
    id?: string
    fondDeRoulement?: string
    ecart?: number
    solde?: number
    tresorerieName?: number
    ouvFerName?: number
    tresorerie?: number
    ouvFerId?: number
    setFieldValue: (field: string, value: any) => void;

    
}


