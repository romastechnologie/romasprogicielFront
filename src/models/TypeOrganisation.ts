export  interface TypeOrganisation {
    id: number;
    libelle: string;
    code: string;
    typeOrganisation:number;
    setFieldValue: (field: string, value: any) => void;
  }