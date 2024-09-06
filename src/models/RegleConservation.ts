export  interface RegleConservation {
    id: number;
    code: string;
    libelle: string;
    sortFinal:string;
    dureeConservation:Date;
    description:string;
    typeDuree:Date;
    setFieldValue: (field: string ,value: any) => void;
  }