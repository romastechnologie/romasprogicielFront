export  interface Fournisseur {
    id: number;
    nomFournisseur: string;
    prenomFournisseur: string;
    telFournisseur1: string;
    telFournisseur2: string;
    email: string;
    sigle: string;
    rrcm: string;
    ifu: string;
    denomination: string;
    dateCreation:string;
    adresseFournisseur: string;
    sexe: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }