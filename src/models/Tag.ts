export  interface Tag {
    id: number;
    libelle: string;
    code: string;
    setFieldValue: (field: string, value: any) => void;
  }