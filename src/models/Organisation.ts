export  interface Organisation {
    id: number;
    nom: string;
    code: string;
    organisation:string;
    typeorganisation:string;
    
    setFieldValue: (field: string, value: any) => void;
  }