export type Gender = 'MALE' | 'FEMALE';

export type AdmissionType = 'VOLUNTARY' | 'INVOLUNTARY_LEGAL' | 'FORENSIC';

export type PatientStatus = 'INPATIENT' | 'OUTPATIENT' | 'DISCHARGED' | 'ESCAPED' | 'DECEASED';

export type DietaryType = 'NORMAL' | 'DIABETIC' | 'LOW_SODIUM' | 'PUREED' | 'CUSTOM';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

export type UserRole = 
  | 'CONSULTANT_PSYCHIATRIST'
  | 'WARD_HEAD_NURSE'
  | 'FORENSIC_LEGAL_OFFICER'
  | 'KITCHEN_SUPERVISOR'
  | 'SOCIAL_WORKER'
  | 'HOSPITAL_DIRECTOR';

export interface Patient {
  id: string;
  archive_number: string; // Old manual file ID (indexed, e.g. RSH-1982-419)
  national_id?: string;
  full_name: string; // Quadruple Iraqi name
  mother_name: string;
  gender: Gender;
  date_of_birth: string;
  age: number;
  admission_type: AdmissionType;
  current_status: PatientStatus;
  ward_id?: string;
  bed_number?: string;
  dietary_type: DietaryType;
  dietary_notes?: string;
  trust_fund_balance: number; // IQD (Iraqi Dinar)
  risk_level: RiskLevel;
  suicide_risk: boolean;
  violence_risk: boolean;
  admission_date: string;
  photo_url: string;
  primary_diagnosis: string;
  icd11_code: string;
  dsm5_code: string;
  secondary_diagnosis?: string;
  is_unidentified?: boolean;
  fingerprint_hash?: string;
  court_case_number?: string;
  custody_court?: string;
  allergies: string[];
}

export interface MentalStatusExam {
  id: string;
  patient_id: string;
  assessment_date: string;
  examiner_name: string;
  appearance_grooming: string;
  behavior_psychomotor: string; // Catatonia, Psychomotor agitation, Retardation
  speech_characteristics: string; // Pressured, Slow, Tangential, Coherent
  mood_subjective: string; // Depressed, Euphoric, Irritable, Euthymic
  affect_objective: string; // Flat, Blunted, Labile, Incongruent
  thought_process: string; // Flight of ideas, Loosening of association, Neologisms
  thought_content: string; // Delusions of persecution, Grandiose delusions, Obsessions
  perception: string; // Auditory imperative hallucinations, Visual
  cognition_orientation: string; // Oriented x3, Disoriented
  insight_judgment_grade: number; // Grade 1 (complete denial) to 6 (true emotional insight)
  clinical_summary: string;
}

export interface Nursing15MinCheck {
  id: string;
  time: string;
  nurse_name: string;
  vital_signs: string; // BP, Pulse, SpO2
  hydration_nutrition_offered: boolean;
  range_of_motion_done: boolean;
  patient_behavior: string;
}

export interface RestraintAuditLog {
  id: string;
  patient_id: string;
  patient_name: string;
  ward_id: string;
  type: 'PHYSICAL_4_POINT' | 'SECLUSION_ROOM' | 'CHEMICAL_RESTRAINT';
  start_time: string;
  end_time?: string;
  authorized_by_doctor: string;
  authorization_reason: string;
  active: boolean;
  fifteen_min_checks: Nursing15MinCheck[];
}

export interface ForensicLegalOrder {
  id: string;
  patient_id: string;
  patient_name: string;
  court_name: string;
  case_number: string;
  legal_article: string; // e.g., 'المادة 78 عقوبات (إيداع وقائي)', 'المادة 80 عقوبات', 'المادة 60 (انعدام المسؤولية)'
  order_date: string;
  observation_end_date: string;
  committee_status: 'PENDING' | 'SCHEDULED' | 'COMPLETED';
  committee_type: '3_DOCTOR' | '5_DOCTOR';
  committee_members?: string[];
  findings_summary?: string;
  legal_responsibility_decision?: 'RESPONSIBLE' | 'NOT_RESPONSIBLE_INSANE' | 'DIMINISHED_RESPONSIBILITY';
  requires_continued_detention?: boolean;
  digital_signature_hash?: string;
  signed_at?: string;
}

export type MealType = 'BREAKFAST' | 'LUNCH' | 'AFTERNOON_SNACK' | 'DINNER';
export type MealWave = MealType;

export interface MealManifest {
  id: string;
  date: string;
  meal_type: MealType;
  ward_id: string;
  ward_name: string;
  normal_count: number;
  diabetic_count: number;
  low_sodium_count: number;
  pureed_count: number;
  total_count: number;
  special_instructions: string[];
  dispatch_status: 'PREPARING' | 'DISPATCHED' | 'RECEIVED_BY_WARD';
  temperature_celsius: number;
  kitchen_supervisor: string;
  receiving_nurse?: string;
  timestamp: string;
}

export interface MedicationAdministrationRecord {
  id: string;
  patient_id: string;
  patient_name: string;
  patient_photo: string;
  ward_id: string;
  bed_number: string;
  medication_name: string;
  dosage: string;
  route: 'ORAL' | 'IM' | 'IV' | 'DEPOT_IM';
  scheduled_time: string;
  administered_time?: string;
  administered_by_staff_id?: string;
  administered_by_staff_name?: string;
  status: 'SCHEDULED' | 'GIVEN' | 'REFUSED' | 'OMITTED';
  omitted_reason?: string;
  omission_reason?: string;
  is_controlled_psychotropic: boolean;
  barcode: string;
  witness_staff_name?: string;
  witness_nurse?: string;
}

export type EmarRecord = MedicationAdministrationRecord;

export interface ControlledDrugVaultItem {
  id: string;
  generic_name: string;
  brand_name: string;
  formulation: string;
  central_store_balance: number;
  ward_distribution: Record<string, number>;
  total_stock: number;
  schedule_class: 'SCHEDULE_I' | 'SCHEDULE_II';
  batch_number: string;
  expiry_date: string;
  requires_double_sign: boolean;
  daily_consumed: number;
}

export interface DepotInjectionAlert {
  id: string;
  patient_id: string;
  patient_name: string;
  ward_id: string;
  medication: string;
  dosage: string;
  interval_days: number;
  last_administered_date: string;
  next_due_date: string;
  days_overdue_or_remaining: number;
  status: 'UPCOMING' | 'DUE_TODAY' | 'OVERDUE';
}

export interface TrustFundTransaction {
  id: string;
  patient_id: string;
  patient_name: string;
  archive_number: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PENSION_ALLOWANCE';
  amount_iqd: number;
  balance_after: number;
  date: string;
  requested_by: string; // Social worker or family guardian
  authorized_by: string;
  purpose: string;
  receipt_number: string;
}

export interface PatientValuableAsset {
  id: string;
  patient_id: string;
  item_name: string;
  description: string;
  storage_safe_box: string;
  deposited_at: string;
  condition: string;
}

export interface WardInfo {
  id: string;
  name: string;
  arabic_name: string;
  building_zone: string; // e.g. Zone A, Zone B, Zone C (Forensic)
  gender: 'MALE' | 'FEMALE' | 'FORENSIC';
  total_beds: number;
  occupied_beds: number;
  seclusion_beds: number;
  head_nurse: string;
  doctor_in_charge: string;
  contact_extension: string;
}

export interface StaffMember {
  id: string;
  name: string;
  arabic_name: string;
  role: UserRole;
  role_title_ar: string;
  department: string;
  assigned_ward: string;
  shift: 'MORNING' | 'EVENING' | 'NIGHT';
  phone: string;
  license_number: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  role: UserRole;
  action: string;
  action_ar: string;
  target_resource: string;
  details: string;
  terminal_id: string;
  hash: string;
}

export interface OPDQueueItem {
  id: string;
  ticket_number: string;
  patient_name: string;
  national_id?: string;
  referral_source: 'POLICE_COURT' | 'FAMILY_WALKIN' | 'GENERAL_HOSPITAL' | 'RED_CRESCENT';
  referral_details: string;
  triage_level: 'EMERGENCY_RED' | 'URGENT_YELLOW' | 'ROUTINE_GREEN';
  arrival_time: string;
  estimated_wait_minutes: number;
  status: 'WAITING' | 'IN_CONSULTATION' | 'RECOMMENDED_ADMISSION' | 'OUTPATIENT_MEDS' | 'TRANSFERRED';
  assigned_doctor: string;
}
