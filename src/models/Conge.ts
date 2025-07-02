export  interface Conge {
    id: number;
    libelle: string;
    description: string;
    setFieldValue: (field: string, value: any) => void;
  }