import { IRoles } from ".";

export interface IUser {
    Id: string;
    Nombres: string;
    Apellidos: string;
    TipoId: string;
    Email: string;
    Password: string;
    Roles: IRoles[];
}

export interface IUserTable {
    Id: string;
    Nombres: string;
    Apellidos: string;
    TipoId: string;
    Email: string;
    Password?: string;
    Roles: string;
}

export interface ITypeModal<T> {
    type: TypeModal,
    data: T
}

export type TypeModal = 'CREATE' | 'EDIT' | 'ALERT';