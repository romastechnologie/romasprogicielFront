export  interface TypeDocument {
    id: number;
    code: string;
    nom: string;
    setFieldValue: (field: string, value: any) => void;
  }