import { Tresorerie } from "./Tresorerie"

export interface Ouv_FerObject {
    code: number;
    message: string;
    data: Ouv_Fer[];
}

export interface Ouv_Fer {
    id?: string
    fondDeRoulement?: string
    ecart?: number
    solde?: number
    tresorerieName?: number
    ouvFerName?: number
    tresorerie?: Tresorerie
    ouvFerId?: number
    
}