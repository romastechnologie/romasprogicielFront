export  interface Justificatif {
    id: number;
    date: Date;
    personnel: string;
    presence:string;
    dateFinJustificatif: Date;
    dateDebutJustificatif: Date;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }