export  interface RoleEtap {
    id: number;
    libelle: string;
    code: string;
    ordre: number;

    setFieldValue: (field: string, value: any) => void;
  }