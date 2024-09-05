export  interface Organisation {
    id: number;
    nom: string;
    code: string;
    typeOrganisation:string;
    
    setFieldValue: (field: string, value: any) => void;
  }