export  interface PermissionP {
    id: number;
    date: Date;
    demande: string;
    personnel: string;
    motif: string;
    dateDebut: Date;
    dateFin: Date;
    dateReprise: Date;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }