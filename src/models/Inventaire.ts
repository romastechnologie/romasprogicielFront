export  interface Inventaire {
    id: number;
    libelleFamille: string;
    codeFamille: string;
    famille: string;
    setFieldValue: (field: string, value: any) => void;
  }

  export interface InventaireDepot {
    produit:string,
    prix: number,
    qtite: number,
    montant: number,
}