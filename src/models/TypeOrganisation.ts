export  interface TypeOrganisation {
    id: number;
    libelle: string;
    code: string;
    typeOrganisation:string;
    setFieldValue: (field: string, value: any) => void;
  }