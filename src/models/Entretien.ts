export  interface Entretien {
    id: number;
    code: string;
    libelle: string;
    description:string;
    daterealisation:Date;
    createdAt:Date;
    bien:string;
    setFieldValue: (field: string, value: any) => void;
  }