import { AuditLog, UserRole } from '../types';

export class AuditService {
  static createEntry(
    userName: string,
    role: UserRole,
    action: string,
    details: string,
    ipAddress: string = '192.168.10.45'
  ): AuditLog {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const rawString = `${timestamp}:${userName}:${role}:${action}:${details}`;
    
    let hashVal = 0;
    for (let i = 0; i < rawString.length; i++) {
      const chr = rawString.charCodeAt(i);
      hashVal = ((hashVal << 5) - hashVal) + chr;
      hashVal |= 0;
    }
    const hexHash = Math.abs(hashVal).toString(16).padStart(8, '0');
    const fullHash = `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b78${hexHash}`;

    return {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      user_id: `usr-${role.toLowerCase()}`,
      user_name: userName,
      role,
      action,
      details,
      ip_address: ipAddress,
      hash: fullHash
    };
  }
}
