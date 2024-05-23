export interface ServiceObject {
    code: number;
    libelle: string;
    data: Service[];
}
export interface Service{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

