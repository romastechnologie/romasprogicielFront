export  interface ModeleContrat {
    id: number;
    dureeDefaut: number;
    salaireBaseDefaut: string;
    conditionsSpecifiques: string;
    typeContrat:string,

    setFieldValue: (field: string, value: any) => void;
  }