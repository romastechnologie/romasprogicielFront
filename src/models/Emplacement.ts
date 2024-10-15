export  interface Emplacement {
    id: number;
    code: string;
    description:string;
    typeEmplacement:string;
    
    setFieldValue: (field: string, value: any) => void;
  }