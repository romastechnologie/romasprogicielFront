export  interface Amortissement {
    id: number;
    taux: number;
    valeurNetteComptable: number;
    dureeUtilisation:number;
    bien: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }
  
