export interface PosteObject {
    code: number;
    libelle: string;
    data: Poste[];
}
export interface Poste{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  attributionpostes:AttributionPoste[]
  setFieldValue: (field: string, value: any) => void;
}

export interface AttributionPoste {
  id:number,
  attribution:Attribution,
}

export interface Attribution {
  libelle:string,
  code:string
}