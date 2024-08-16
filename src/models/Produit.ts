export  interface Produit {
    id: number;
    libelleFamille: string;
    codeFamille: string;
    famille: string;
    setFieldValue: (field: string, value: any) => void;
  }

  export interface ConditionnementDepot {
    conditionnement:string,
    quantite: number,
    prixMin: number,
    prixVente: number,
    prixMax: number,
}

export interface ProduitDepot {
  produit:string,
  qtite: number,
  montant: number,
  prixRevient:number,
  prix: number,
  prixMax: number,
  qtitePhysique: number,
  qtiteLogique: number,
  ecart: number,
  prixUnitaire:number,
}
