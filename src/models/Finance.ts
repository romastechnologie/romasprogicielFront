export interface FinanceObject {
    code: number;
    message: string;
    data: Finance[];
}

export interface Finance {
    id?: number
    fichier?: string
    montant?: number
    type?: string
    nomBeneficiaire?: string
    prenomBeneficiaire?: string
    utilisateurName?: string
    tresorerieName?: number
    financeId?: number
}