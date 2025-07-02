export  interface Mission {
    fields: any;
    id: number;
    description: string;
    destination: string;
    dateDebut: Date;
    dateFin: Date;

    setFieldValue: (field: string, value: any) => void;
  }