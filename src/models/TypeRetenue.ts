export  interface TypeRetenue {
    id: number;
    nomRetenue: string;
    description: string;
    taux:number;
    montantParDefaut:number;
    setFieldValue: (field: string, value: any) => void;
  }