export  interface TypeMoyenRoulant {
    id: number;
    libelle: string;
    description: string;
    setFieldValue: (field: string, value: any) => void;
  }