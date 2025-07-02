export  interface Livraison {
    id: number;
    libelleFamille: string;
    codeFamille: string;
    famille: string;
    setFieldValue: (field: string, value: any) => void;
  }
  export interface LivraisonDepot {
    approvisionnement:string,
    prix: number,
    qtite: number,
    montant: number,
}