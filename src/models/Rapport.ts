export  interface Rapport {
    id: number;
    contenu: string;

    setFieldValue: (field: string, value: any) => void;
  }