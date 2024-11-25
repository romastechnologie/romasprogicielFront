export  interface CategoriesDepenses {
    id?: number;
    reference?: string;
    libelle?: string;
    description?: string;
    categoriesDepenses?:number;
    setFieldValue: (field: string, value: any) => void;
  }
