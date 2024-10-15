export  interface RegleConservation {
    id: number;
    code: string;
    libelle: string;
    sortFinal:string;
    dureeConservation:number;
    description:string;
    typeDuree:string;
    setFieldValue: (field: string ,value: any) => void;
  }