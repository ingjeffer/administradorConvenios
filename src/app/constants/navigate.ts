export enum NavigatePath {
    Login = 'login',
    Dashboard = '',
    Admin = 'admin',
    Gestor = 'gestor',
    Secretaria = 'secretaria',
    Default = '**',
}

export interface INavigatePath {
    Login: string;
    Dashboard: string;
    Admin: string;
    Gestor: string;
    Secretaria: string;
    Default: string;
}
