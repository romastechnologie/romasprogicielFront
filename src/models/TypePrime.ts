export  interface TypePrime {
    id: number;
    nomPrime: string;
    description: string;
    valeur:number;
    typeDeValeur:string;
    setFieldValue: (field: string, value: any) => void;
  }