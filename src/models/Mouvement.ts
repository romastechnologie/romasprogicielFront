export  interface Mouvement {
    id: number;
    qte: number;
    typeOperation: string;
    produitInventorier: string;
    setFieldValue: (field: string, value: any) => void;
  }