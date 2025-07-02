export interface EtapeValidation {
    id: number
    nom: string
    Ordre: number
    statut: string
    Duree: number
    typeDuree: string
    circuit: string
    roleetap: string

    setFieldValue: (field: string, value: any) => void;
}