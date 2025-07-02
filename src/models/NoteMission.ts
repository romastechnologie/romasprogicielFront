export  interface NoteMission {
    id: number;
    objet: string;
    budget: number;
    contenue: string;
    reference: string;
    mission: string;

    setFieldValue: (field: string, value: any) => void;
  }