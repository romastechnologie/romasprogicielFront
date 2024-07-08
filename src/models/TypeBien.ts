export  interface TypeBien {
    id: number;
    code: string;
    libelle: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }