import jwt_decode from 'jwt-decode';

const TOKEN = 'TOKEN';

export function setSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSession(key: string): string {
    return sessionStorage.getItem(key) ?? '';
}

export function setToken(value: string) {
    setSession(TOKEN, value);
}

export function getToken(): string {
    return getSession(TOKEN);
}

export function removeSession(key: string) {
    sessionStorage.removeItem(key);
}

export function clearAllSession() {
    sessionStorage.clear();
}

export function decodeToken(): any {
    return jwt_decode(getToken());
}