export interface ServiceObject {
    code: number;
    libelle: string;
    data: TypeConge[];
}
export interface TypeConge{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

