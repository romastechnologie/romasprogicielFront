export  interface Validation {
    id: number;
    statut: string;
    dateValidation: Date;
    dateNotification: Date;
    commentaire: string;
    demande:string;
    validateur:string;

    setFieldValue: (field: string, value: any) => void;
  }