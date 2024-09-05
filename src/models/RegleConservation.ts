export  interface RegleConservation {
    id: number;
    code: string;
    libelle: string;
    setFieldValue: (field: string ,value: any) => void;
  }