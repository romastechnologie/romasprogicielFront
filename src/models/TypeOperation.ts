export  interface TypeOperation {
    id: number;
    libelle: string;
    setFieldValue: (field: string, value: any) => void;
  }