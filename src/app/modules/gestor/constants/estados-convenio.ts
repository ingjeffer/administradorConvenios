export enum EstadoConvenioSecretaria {
    Firmado = "FIRMADO",
    Aprobado = "APROBADO_SECRETARIA",
    Rechazado = "RECHAZADO_SECRETARIA"
}

export interface IEstadoConvenioSecretaria {
    Firmado: string;
    Aprobado: string;
    Rechazado: string;
}

export enum EstadoConvenioDirectorRelex {
    Aprobado = "APROBADO_DIRECTOR_RELEX",
    Rechazado = "RECHAZADO_DIRECTOR_RELEX"
}

export interface IEstadoConvenioDirectorRelex {
    Aprobado: string;
    Rechazado: string;
}

export enum EstadoConvenioConsejoAca {
    Aprobado = "APROBADO_CONSEJO_ACADEMICO",
    Rechazado = "RECHAZADO_CONSEJO_ACADEMICO"
}

export interface IEstadoConvenioConsejoAca {
    Aprobado: string;
    Rechazado: string;
}
