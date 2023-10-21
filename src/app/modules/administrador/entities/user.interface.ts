import { IRoles } from ".";

export interface IUser {
    id: string;
    nombres: string;
    apellidos: string;
    tipoId: string;
    email: string;
    password: string;
    roleId: number;
    firma: string;
}

export interface IUserTable {
    id: string;
    nombres: string;
    apellidos: string;
    tipoId: string;
    email: string;
    password?: string;
    firma?: string;
    rol: {
        id: number;
        nombre: string;
    };
}

export interface ITypeModal<T> {
    type: TypeModal,
    data: T
}

export type TypeModal = 'CREATE' | 'EDIT' | 'ALERT';