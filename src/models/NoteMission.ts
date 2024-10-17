export  interface NoteMission {
    id: number;
    objet: string;
    budget: number;
    contenue: string;
    reference: string;


    setFieldValue: (field: string, value: any) => void;
  }