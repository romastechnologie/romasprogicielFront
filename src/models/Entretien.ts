export  interface Entretien {
    id: number;
    code: string;
    libelle: string;
    description:string;
    valeur:string;
    unitemesure:string;
    nombrelitre:string;
    realisation:string;
    observation:string;
    daterealisation:Date;
    createdAt:Date;
    bien:number;
    typeentretien:number;
    setFieldValue: (field: string, value: any) => void;
  }