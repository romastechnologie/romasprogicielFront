export  interface Contrat {
    id: number;
    reference: string;
    estResilie?: boolean;
    dateDebut: Date;
    dateFin: Date;
    heuresTravaillees: Date;
    periodeEssai:Date;
    dateFinPeriodeEssai:Date,
    status:string;
    periodeDePaie:Date;
    typeContrat:number;
    employe:string;
    datePriseFonction: Date;
    salaire: number;
    dureeContrat: number;
    conditionLicenciement: string;
    nbJourConge: number;
    salaireBase: number;
    nobreheuresTravail: Date;
    renouvelable: string;
    dureePeriodeEssai: string;
    dateFinperiodeEssai: Date;
    personnelId: number;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }