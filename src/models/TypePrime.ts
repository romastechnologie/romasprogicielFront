export  interface TypePrime {
    id: number;
    nomPrime: string;
    description: string;
    montantParDefaut:number;
    setFieldValue: (field: string, value: any) => void;
  }