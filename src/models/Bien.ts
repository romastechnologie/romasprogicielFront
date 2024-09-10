export  interface Bien {
    id: number;
    refBien: string;
    nomBien: string;
    coutAcquisition: number;
    dateAcquisition: Date;
    dureeVie: number;
    dateMiseEnService: number;
    numeroEnregistrement: number;
    codeBar: string;
    longitude:number,
    latitude:number;
    localisation:string;
    modeAmortissement:string;
    valeurNetteComptable:number;
    typeBien:string;
    categorieBien: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }