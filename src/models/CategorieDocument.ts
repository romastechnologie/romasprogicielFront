export  interface CategorieDocument {
    id: number;
    code: string;
    libelle: string;
    setFieldValue: (field: string, value: any) => void;
  }