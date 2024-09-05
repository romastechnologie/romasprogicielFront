export  interface Emplacement {
    id: number;
    libelle: string;
    code: string;
    description:string;
    typeEmplacement:string;
    
    setFieldValue: (field: string, value: any) => void;
  }