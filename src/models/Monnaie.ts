export interface MonnaieObject {
    code: number;
    libelle: string;
    data: Monnaie[];
}

export interface Monnaie {
    id: number;
    libelle: string;
    valeur: number;
    createdAt?: string;
    setFieldValue: (field: string, value: any) => void;
}