import { MedicationAdministrationRecord, ControlledDrugVaultItem } from '../types';

export interface AdministerVerificationResult {
  valid: boolean;
  requiresWitness: boolean;
  warning?: string;
}

export class MedicationService {
  static verifyAdministration(
    record: MedicationAdministrationRecord, 
    drugItem?: ControlledDrugVaultItem,
    witnessName?: string
  ): AdministerVerificationResult {
    if (drugItem && drugItem.requires_witness && (!witnessName || witnessName.trim().length === 0)) {
      return {
        valid: false,
        requiresWitness: true,
        warning: 'يتطلب صرف هذا الدواء المقيد توقيع شاهد تمريضي ثانٍ وفق ضوابط وزارة الصحة'
      };
    }

    if (drugItem && drugItem.total_stock <= 0) {
      return {
        valid: false,
        requiresWitness: false,
        warning: 'نفاد رصيد الدواء في صيدلية الردهة'
      };
    }

    return {
      valid: true,
      requiresWitness: !!drugItem?.requires_witness
    };
  }

  static isOverdue(scheduledTime: string): boolean {
    const [hours, minutes] = scheduledTime.split(':').map(Number);
    const now = new Date();
    const scheduledDate = new Date();
    scheduledDate.setHours(hours, minutes, 0, 0);
    return now.getTime() > scheduledDate.getTime() + 60 * 60 * 1000;
  }
}
