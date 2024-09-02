export  interface CategoriesDepenses {
    id: number;
    reference: string;
    libelle: string;
    description: string;
    categoriesDepenses:string;
    setFieldValue: (field: string, value: any) => void;
  }