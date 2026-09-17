import { ForensicLegalOrder } from '../types';

export class LegalService {
  static getPendingCourtOrders(orders: ForensicLegalOrder[]): ForensicLegalOrder[] {
    return orders.filter(o => o.status === 'PENDING_BOARD');
  }

  static getCompletedOrders(orders: ForensicLegalOrder[]): ForensicLegalOrder[] {
    return orders.filter(o => o.status === 'REPORT_SENT');
  }

  static getCommitteeQuorum(committeeMembers: string[]): { quorumMet: boolean; requiredCount: number } {
    return {
      quorumMet: committeeMembers.length >= 3,
      requiredCount: 5
    };
  }
}
