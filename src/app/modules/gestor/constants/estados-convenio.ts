export enum EstadoConvenio {
    Firmado = "FIRMADO",
    Aprobado_Secretaria = "APROBADO_SECRETARIA",
    Rechazado_Secretaria = "RECHAZADO_SECRETARIA"
}

export interface IEstadoConvenio {
    Firmado: string;
    Aprobado_Secretaria: string;
    Rechazado_Secretaria: string;
}
