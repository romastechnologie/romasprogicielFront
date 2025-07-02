export  interface TypeEntretien {
    id: number;
    libelle: string;
    description:string;
    setFieldValue: (field: string, value: any) => void;
  }