export enum NavigatePath {
    Login = 'login',
    Dashboard = '',
    Admin = 'admin',
    Gestor = 'gestor',
    Secretaria = 'secretaria',
    DirectorRelex = 'director_relex',
    Default = '**',
}

export interface INavigatePath {
    Login: string;
    Dashboard: string;
    Admin: string;
    Gestor: string;
    Secretaria: string;
    DirectorRelex: string;
    Default: string;
}
