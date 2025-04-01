export interface ReglesTypes{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

