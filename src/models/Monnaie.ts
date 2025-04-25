export interface MonnaieObject {
    code: number;
    message: string;
    data: Monnaie[];
}

export interface Monnaie {
    id: number;
    libelle: string;
    valeur: number;
    created_at: Date;
    setFieldValue: (field: string, value: any) => void;
}