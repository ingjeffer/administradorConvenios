import { NavigatePath } from "@const/navigate";
import { decodeToken } from "./session-storage";

const pathRole: any = {
    1: NavigatePath.Admin,
    2: NavigatePath.Gestor,
    3: NavigatePath.Secretaria,
    4: NavigatePath.DirectorRelex,
    undefined: NavigatePath.Default
}

export function pathUtils(path: NavigatePath): string {
    return `/${path}`;
}

export function mapTokenToPath(): string {
    const token = decodeToken();
    const path = pathRole[token.role.Id];
    return pathUtils(path);
}


export function getRoleId(): number {
    const token = decodeToken();
    return token?.role?.Id ?? -1;
}
