export interface FinanceObject {
    code: number;
    message: string;
    data: Finance[];
}

export interface Finance {
    id?: number
    fichierfinance?: string
    montant?: number
    type?: string
    beneficiaire?: string
    resteAPayer:string
    personnelId?:number
    utilisateurName?: string
    tresorerieId?: number
    financeId?: number
    setFieldValue: (field: string, value: any) => void;
}

