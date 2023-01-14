export interface IGestorTable {
    id: string;
    nombreInstitucion: string;
    nombreConvenio: string;
    tipologiaConvenio: string;
    caracterizacion: string;
}

export interface IGestor {
    id: string;
    nombreInstitucion: string;
    nombreConvenio: string;
    objetoConvenio: string;
    tipologiaConvenio: string;
    modalidadConvenio: string;
    beneficiarios: string;
    caracterizacion: string;
    infoGestor: IGestor;
    estado?: string;
    firmaUrl: string;
    observaciones: string;
}

export interface IGestorInfo {
    nombreResponsable: string;
    fecha: string;
    unidadAcademica: string;
    cargo: string;
    email: string;
    telefono: string;
}