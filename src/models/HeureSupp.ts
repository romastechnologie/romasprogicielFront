export  interface HeureSupp {
    id: number;
    date: Date;
    personnel: string;
    duree: number;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }