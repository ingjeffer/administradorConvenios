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