export interface CategorieDemandeObject {
    code: number;
    libelle: string;
    data: CategorieDemande[];
}
export interface CategorieDemande{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

