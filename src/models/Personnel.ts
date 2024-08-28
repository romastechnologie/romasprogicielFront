export  interface Personnel {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    nom:string;
    prenom:string;
    situationMatrimoniale:string;
    sexe:string,
    urlImage:string;
    civilite:string;
    dateNais:Date;
    dateEmbauche:Date;
    numeroSecuriteSociale:number,
    nationalite:string;
    religions:string;
    ethnies:string;
    services:string;
    fonction:string;
    dateDebut:Date;
    dateFin:Date;


    setFieldValue: (field: string, value: any) => void;
  }