export interface ChampsLibre {
    id: number;
    typeChamp: string;
    nomChamp: string;
    libelleChamp: string;
    valeurParDefaut: number;
    modeSaisie: string;
    valeurPosible: number;
    setFieldValue: (field: string, value: any) => void;
}