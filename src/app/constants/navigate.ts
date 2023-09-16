export enum NavigatePath {
    Login = 'login',
    Dashboard = '',
    Admin = 'admin',
    Gestor = 'gestor',
    Secretaria = 'secretaria',
    DirectorRelex = 'director-relex',
    ConsejoAcademico = 'consejo-academico',
    Vicerrectoria = 'vicerrectoria',
    Rectoria = 'rectoria',
    DirJuridico = 'director-juridico',
    Default = '**',
}

export interface INavigatePath {
    Login: string;
    Dashboard: string;
    Admin: string;
    Gestor: string;
    Secretaria: string;
    DirectorRelex: string;
    ConsejoAcademico: string;
    Vicerrectoria: string;
    Rectoria: string;
    DirJuridico: string;
    Default: string;
}
