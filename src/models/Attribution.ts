export interface AttributionObject {
    code: number;
    libelle: string;
    data: Attribution[];
}
export interface Attribution{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

