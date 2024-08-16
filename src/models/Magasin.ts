export  interface Magasin {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    setFieldValue: (field: string, value: any) => void;
  }

  export interface MagasinDepot {
    magasin:string,
    prix: number,
    qtite: number,
    montant: number,
}