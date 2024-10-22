export  interface Rapport {
    id: number;
    contenu: string;
    mission?: {
      id: number;
      description: string;
  };
      setFieldValue: (field: string, value: any) => void;
  }