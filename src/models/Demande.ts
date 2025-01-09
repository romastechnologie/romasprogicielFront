export  interface Demande {
    id: number;
    categorieId: string;
    dateDemande:Date;
    motifDemande:string;
    personnel:string;
    personnelId: string;
    telephone: string;
    conge:string;
    type:string,
    updatedAt: string;
    deletedAt?: string;
    setFieldValue: (field: string, value: any) => void;
  }