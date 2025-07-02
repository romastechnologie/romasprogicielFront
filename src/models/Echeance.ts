export  interface Echeance {
    id: number;
    dateEcheance: Date;
    montant: number;
    resteAPaye: number;
    demande: string;
    setFieldValue: (field: string, value: any) => void;
  }