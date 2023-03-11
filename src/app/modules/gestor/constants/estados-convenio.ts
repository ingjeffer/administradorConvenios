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
    Firmado = "FIRMADO",
    Aprobado = "APROBADO_DIRECTOR_RELEX",
    Rechazado = "RECHAZADO_DIRECTOR_RELEX"
}

export interface IEstadoConvenioDirectorRelex {
    Firmado: string;
    Aprobado: string;
    Rechazado: string;
}

export enum EstadoConvenioConsejoAca {
    Firmado = "FIRMADO",
    Aprobado = "APROBADO_CONSEJO_ACADEMICO",
    Rechazado = "RECHAZADO_CONSEJO_ACADEMICO"
}

export interface IEstadoConvenioConsejoAca {
    Firmado: string;
    Aprobado: string;
    Rechazado: string;
}
