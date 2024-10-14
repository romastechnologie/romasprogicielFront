export  interface Circuit {
    id: number;
    nom: string;
    Duree: number;
    typeDuree: string;

    setFieldValue: (field: string, value: any) => void;
  }