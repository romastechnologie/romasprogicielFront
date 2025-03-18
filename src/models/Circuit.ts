export  interface Circuit {
    id: number;
    nom: string;
    Duree: number;
    typeDuree: string;
    etapevalidations:string;

    setFieldValue: (field: string, value: any) => void;
  }