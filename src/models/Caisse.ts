export  interface Caisse {
    id: number;
    code:string;
    libelle:string;
    // photo: string;
    // nomMedia: string;
    // typeMedia: string;
    // extension: string;
    // idTable: number;
    // nomTable: string;
    setFieldValue: (field: string, value: any) => void;
  }