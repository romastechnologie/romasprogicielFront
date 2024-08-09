export interface TypeTresorerieObject {
    code: number;
    message: string;
    data: TypeTresorerie[];
}

export interface TypeTresorerie {
    id?: number;
    code?: string;
    libelle?: number;
    parentId?: number
    created_at?: Date;
    typeTresorerie?: TypeTresorerie,
    setFieldValue?: (field: string, value: any) => void;
}