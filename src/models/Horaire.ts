import { DateTimeFormatResult } from "vue-i18n";

export  interface Horaire {
    id: number;
    jour: string;
    heureOuverture: string;
    heureFermeture: string;
    heureDebutPause:string;
    heureFinPause:string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }