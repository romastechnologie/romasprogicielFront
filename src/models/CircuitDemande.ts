export  interface CircuitDemande {
    id: number;
    categorie: string;
    circuit: number;
    
    setFieldValue: (field: string, value: any) => void;
  }