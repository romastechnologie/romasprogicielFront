export  interface TypeRetenue {
    id: number;
    nomRetenue: string;
    description: string;
    taux:number;
    setFieldValue: (field: string, value: any) => void;
  }