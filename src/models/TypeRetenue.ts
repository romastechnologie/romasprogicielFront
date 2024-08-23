export  interface TypeRetenue {
    id: number;
    nomRetenue: string;
    description: string;
    valeur:number;
    typeDeValeur:string;
    setFieldValue: (field: string, value: any) => void;
  }