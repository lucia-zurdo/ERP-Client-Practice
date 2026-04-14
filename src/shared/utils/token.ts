interface TokenPayload {
  permissions?: string[];
  exp?: number;
  sub?: string;
}

export function parseTokenPermissions(token: string): string[] {
  try {
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return [];
    const decoded: TokenPayload = JSON.parse(atob(base64Payload));
    return Array.isArray(decoded.permissions) ? decoded.permissions : [];
  } catch {
    return [];
  }
}