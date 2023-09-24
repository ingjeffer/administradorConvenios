//#region Secretaria
export enum EstadoConvenioSecretaria {
    Aprobado = "APROBADO_SECRETARIA",
    Rechazado = "RECHAZADO_SECRETARIA"
}

export interface IEstadoConvenioSecretaria {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Secretaria

//#region Director Relex
export enum EstadoConvenioDirectorRelex {
    Aprobado = "APROBADO_DIRECTOR_RELEX",
    Rechazado = "RECHAZADO_DIRECTOR_RELEX"
}

export interface IEstadoConvenioDirectorRelex {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Director Relex

//#region Consejo Académico
export enum EstadoConvenioConsejoAca {
    Aprobado = "APROBADO_CONSEJO_ACADEMICO",
    Rechazado = "RECHAZADO_CONSEJO_ACADEMICO"
}

export interface IEstadoConvenioConsejoAca {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Consejo Académico

//#region Vicerrectoria
export enum EstadoVicerrectoria {
    Aprobado = "APROBADO_VICERECTORIA",
    Rechazado = "RECHAZADO_VICERECTORIA"
}

export interface IEstadoVicerrectoria {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Vicerrectoria

//#region Rectoria
export enum EstadoRectoria {
    Aprobado = "APROBADO_RECTORIA",
    Rechazado = "RECHAZADO_RECTORIA"
}

export interface IEstadoRectoria {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Rectoria

//#region Director Juridico
export enum EstadoDirJuridico {
    Aprobado = "APROBADO_DIRECTOR_JURIDICO",
    Rechazado = "RECHAZADO_DIRECTOR_JURIDICO"
}

export interface IEstadoDirJuridico {
    Aprobado: string;
    Rechazado: string;
}
//#endregion Director Juridico
