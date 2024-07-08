export  interface MouvementBien {
    id: number;
    refMouvement: string;
    dateMouvement: Date;
    infosComplementaire: number;
    ancienEmplacement: string;
    nouvelEmplacement: string;
    typeMouvement:string;
    typeOptions:string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }