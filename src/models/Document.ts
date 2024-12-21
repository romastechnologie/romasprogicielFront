import { CategorieDocument } from "./CategorieDocument";
import { TypeDocument } from "./TypeDocument";
export  interface Document {
    id: number;
    libelle: string;
    nom: string;
    refDoc: string;
    etat: boolean;
    description:string;
    dateFinConservation:Date;
    fichier:URL;
    statut:string;
    organe:string;
    format:string;
    tag:string;
    CategorieDocument:string;
    TypeDocument:string;
    setFieldValue: (field: string, value: any) => void;
  }