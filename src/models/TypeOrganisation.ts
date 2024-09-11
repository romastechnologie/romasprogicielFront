export  interface TypeOrganisation {
    id: number;
    libelle: string;
    code: string;
    typeorganisation:string;

    setFieldValue: (field: string, value: any) => void;
  }