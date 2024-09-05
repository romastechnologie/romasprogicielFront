export  interface TypeEmplacement {
    id: number;
    code: string;
    libelle: string;
    prefixe: string;
    ordre : string;
    setFieldValue: (field: string, value: any) => void;
  }