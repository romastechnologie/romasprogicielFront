export interface UserEtapes {
    id: number
    userId: number

    setFieldValue: (field: string, value: any) => void;
}