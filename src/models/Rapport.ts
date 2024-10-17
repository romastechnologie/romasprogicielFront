export  interface Rapport {
    id: number;
    contenu: string;
    missionId: number;
    setFieldValue: (field: string, value: any) => void;
  }