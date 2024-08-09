export  interface Demande {
    id: number;
    categorieId: string;
    personnelId: string;
    telephone: string;
    updatedAt: string;
    deletedAt?: string;
    setFieldValue: (field: string, value: any) => void;
  }