export  interface Vente {
    id: number;
    libelleFamille: string;
    codeFamille: string;
    famille: string;
    setFieldValue: (field: string, value: any) => void;
  }