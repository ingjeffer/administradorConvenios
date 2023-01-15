export enum EstadoConvenio {
    Creado = "CREADO",
    Firmado = "FIRMADO",
    Aprobado_Secretaria = "APROBADO_SECRETARIA",
    Rechazado_Secretaria = "RECHAZADO_SECRETARIA"
}

export interface IEstadoConvenio {
    Creado: string;
    Firmado: string;
    Aprobado_Secretaria: string;
    Rechazado_Secretaria: string;
}
