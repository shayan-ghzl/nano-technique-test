export interface ICurrentUser{
    Key: number;
    Value: {
        Token: string;
        RefreshToken: string;
        SrName: string;
        SrFamil: string;
        expireMinutes: string;
    }
}

export type AuthState = ICurrentUser | null;

export interface IDevice{
    idrRid: number,
    idpId: number,
    idrDateOfService: string;
    idrTimeOfService: string;
    idrClientName: string;
}

export interface IDeviceDto{
    RData: string;
    TotalPages: number;
    CurrentPage: number;
    PageItemCount: number;
    TotalCount: number;
    ServerCalcTime: number;
    summary: string[];
    IsDataCompressed: boolean;  
}

export interface IReportDto{
    RData: string;
    TotalPages: number;
    CurrentPage: number;
    ServerCalcTime: number;
    summary: string[];
    IsDataCompressed: boolean;
}

export interface IToken{
    srCode: string;
    exp: number;
    iss: string;
    aud: string;
}

export interface IReport{

}

export interface IActionDto{
    RData: string;
    CurrentPage: number;
    PageItemCount: number;
    TotalCount: number;
    ServerCalcTime: number;
    summary: string[];
    IsDataCompressed: boolean;
}

export interface IAction{
    idrRid: number;
    idpId: number;
    idrDateOfService: string;
    idrTimeOfService: string;
    idrClientName: string;
    servicePlaceAddr: string;
    servicePlaceLoc: string;
    devSNList: string;
}