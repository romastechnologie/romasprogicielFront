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

export interface ProduitSelect {
  commande_clit_id:string,
  magasin:string,
  produit: string,
  qtite: number,
  prixTtc: number,
  prixHt: number,
  taxeSpecifique: number,
  typeRemise: string,
  valeurRemise: number,
  montantHt: number,
  montantTva: number,
  montantTtc: number,
  montantTs:number,
  montantHtApresRemise: number,
  libelleProduit:string,
  groupeTaxeProduit:string,
  carton: number,
  piece: number,
  stock: number,
  remise: number,
  restAliv: number,
  taxe:number
}

        
