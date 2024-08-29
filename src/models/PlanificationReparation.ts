export  interface PlanificationReparation {
    id: number;
    dateReparationPrevue :Date;
    lieuReparation : string;
    estRepare : boolean;
    description : string;
    budgetAlloue : number;
    montantReelDepense : number,
    dateReparationReel : Date;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }