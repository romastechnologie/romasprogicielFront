export  interface PlanificationReparation {
    id: number;
    dateReparationPrevue :Date;
    lieuReparation : string;
    estRepare : boolean;
    description : string;
    reference : string;
    libelle: string;
    budgetAlloue : number;
    montantReelDepense : number,
    dateReparationReel : Date;
    bienId:number;
    bien?: {
      id: number;
      nomBien: string;
    };
    panneId:number; 
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }