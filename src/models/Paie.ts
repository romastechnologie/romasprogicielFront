export  interface Paie {
    id: number;
    refPaie: string;
    datePaie: Date;
    salaireBrut: number;
    salaireNet: number;
    totalRetenues: Date;
    totalPrimes: number;
    periode:Date;
    modePaiement:string,
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }