export  interface Panne {
    id: number;
    description: string;
    libelle: string;
    createdAt:Date;
    bien:number;
    setFieldValue: (field: string, value: any) => void;
  }