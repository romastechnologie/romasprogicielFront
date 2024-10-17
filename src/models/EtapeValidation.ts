export interface EtapeValidation {
    id: number
    nom: string
    Ordre: number
    statut: string
    Duree: number
    typeDuree: string

    setFieldValue: (field: string, value: any) => void;
}