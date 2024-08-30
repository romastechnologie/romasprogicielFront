export  interface Course {
    id: number;
    refSortie: string;
    compteurInitial: string;
    compteurFinal: string;
    description: string;
    destination: string;
    pointDepart: string;
    distanceParcourue: number;
    personel: string;
    bien: string;
    
    setFieldValue: (field: string, value: any) => void;
  

  
}