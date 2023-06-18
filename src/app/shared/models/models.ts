export interface CurrentUser{
    Key: number;
    Value: {
        Token: string;
        RefreshToken: string;
        SrName: string;
        SrFamil: string;
        expireMinutes: string;
    }
}
export type AuthState = CurrentUser | null;