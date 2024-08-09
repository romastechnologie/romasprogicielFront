export interface FonctionObject {
    code: number;
    libelle: string;
    data: Fonction[];
}
export interface Fonction{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

