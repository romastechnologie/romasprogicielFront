export  interface Model {
    id: number;
    libelle: string;
    contenu: string;

    setFieldValue: (field: string, value: any) => void;
  }