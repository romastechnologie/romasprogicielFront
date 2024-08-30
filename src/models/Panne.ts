export  interface Panne {
    id: number;
    description: string;
    libelle: string;
    createdAt:Date;
    biens:string;
    setFieldValue: (field: string, value: any) => void;
  }