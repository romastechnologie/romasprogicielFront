export interface Arrondissement {
    id: number
    titre: string
    urlImage: string
    otherImage: string
    sousTitre: string
    setFieldValue: (field: string, value: any) => void;
}