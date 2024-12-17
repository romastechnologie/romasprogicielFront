export  interface Justificatif {
    id: number;
    personnel: string;
    presence:string;
    dateFin: Date;
    dateDebut: Date;
    statut: string;
    preuveFileName: string;
    justificatif:string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }