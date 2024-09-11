import { DateTimeFormatResult } from "vue-i18n";

export  interface Horaire {
    id: number;
    jour: string;
    heureOuverture: DateTimeFormatResult;
    heureFermeture: DateTimeFormatResult;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }