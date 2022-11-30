export function setSession(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSession(key: string): string {
    return sessionStorage.getItem(key) ?? '';
}

export function removeSession(key: string) {
    sessionStorage.removeItem(key);
}

export function clearAllSession() {
    sessionStorage.clear();
}