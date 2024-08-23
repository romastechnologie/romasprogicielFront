export  interface Contrat {
    id: number;
    refContrat: string;
    dateDebut: Date;
    dateFin: Date;
    salaireDeBase: number;
    heuresTravaillees: Date;
    renouvelable: number;
    periodeEssai:Date;
    dateFinPeriodeEssai:Date,
    status:string;
    periodeDePaie:Date;
    typeContrat:string;
    employe:string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }