export  interface Fournisseur {
    id: number;
    nom: string;
    telephone: string;
    adresse: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }