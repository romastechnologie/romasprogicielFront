export  interface Course {
    id: number;
    reference:string;
    refSortie: string;
    compteurInitial: string;
    compteurFinal: string;
    compteurfinalretour:string;
    description: string;
    destination: string;
    pointDepart: string;
    distanceParcourue: number; 
     bienId: number;
    personnelId: number;
  
    
    setFieldValue: (field: string, value: any) => void;
  

  
}