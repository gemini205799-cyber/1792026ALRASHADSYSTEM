import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Patient, 
  WardInfo, 
  ForensicLegalOrder, 
  MealManifest, 
  MedicationAdministrationRecord, 
  ControlledDrugVaultItem, 
  DepotInjectionAlert, 
  TrustFundTransaction, 
  StaffMember, 
  AuditLog, 
  OPDQueueItem,
  UserRole,
  RestraintAuditLog,
  MentalStatusExam,
  MealType,
  DietaryType
} from '../types';
import { 
  AL_RASHAD_WARDS, 
  INITIAL_PATIENTS, 
  INITIAL_FORENSIC_ORDERS, 
  INITIAL_MEAL_MANIFESTS, 
  INITIAL_CONTROLLED_DRUGS, 
  INITIAL_DEPOT_ALERTS, 
  INITIAL_EMAR_RECORDS, 
  INITIAL_TRUST_FUND_TRANSACTIONS, 
  INITIAL_STAFF, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_OPD_QUEUE,
  INITIAL_RESTRAINT_LOGS,
  INITIAL_MSE_RECORDS,
  searchArchiveSub50ms
} from '../data/mockData';

export type ActiveDomain = 
  | 'OVERVIEW' 
  | 'CAMPUS_OVERVIEW'
  | 'SEHR' 
  | 'MLEGAL' 
  | 'CAMPUS_CATERING' 
  | 'EMAR_PHARMACY' 
  | 'OPD_ARCHIVE' 
  | 'HR_SECURITY'
  | 'ENTERPRISE_HR'
  | 'CAMPUS_MAP';

interface PrintDocumentPayload {
  type: 'MEAL_MANIFEST' | 'FORENSIC_REPORT' | 'EMAR_CHART' | 'TRUST_FUND_RECEIPT' | 'WRISTBAND_LABEL' | 'MSE_SUMMARY';
  title: string;
  data: any;
}

interface HospitalContextType {
  // Navigation & Role
  activeDomain: ActiveDomain;
  setActiveDomain: (domain: ActiveDomain) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  currentUser: { id: string; name: string; role: UserRole };
  activeLanguage: 'ar' | 'en';
  setActiveLanguage: (lang: 'ar' | 'en') => void;

  // Global State
  wards: WardInfo[];
  patients: Patient[];
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  mseRecords: Record<string, MentalStatusExam>;
  restraintLogs: RestraintAuditLog[];
  forensicOrders: ForensicLegalOrder[];
  mealManifests: MealManifest[];
  mealWaves: Array<{
    id: string;
    wave: MealType;
    arabic_name: string;
    scheduled_time: string;
    menu_description: string;
    temperature_celsius: number;
    status: 'COOKING' | 'PREPARED' | 'COMPLETED';
  }>;
  controlledDrugs: ControlledDrugVaultItem[];
  depotAlerts: DepotInjectionAlert[];
  emarRecords: MedicationAdministrationRecord[];
  trustFundTransactions: TrustFundTransaction[];
  staffList: StaffMember[];
  auditLogs: AuditLog[];
  opdQueue: OPDQueueItem[];

  // Command palette & Modals
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;
  scannerTargetAction?: (code: string) => void;
  openBarcodeScanner: (onScan?: (code: string) => void) => void;

  // Print engine
  activePrintDoc: PrintDocumentPayload | null;
  openPrintDocument: (doc: PrintDocumentPayload) => void;
  closePrintDocument: () => void;

  // Business Action Functions
  recordMedicationAdministration: (emarId: string, status: 'GIVEN' | 'REFUSED' | 'OMITTED', witnessName?: string) => void;
  add15MinRestraintCheck: (restraintId: string, check: { vitalSigns: string; hydrationGiven: boolean; rangeOfMotion: boolean; behavior: string }) => void;
  saveMSE: (mse: MentalStatusExam) => void;
  signForensicReport: (orderId: string, doctorName: string, decision: 'RESPONSIBLE' | 'NOT_RESPONSIBLE_INSANE' | 'DIMINISHED_RESPONSIBILITY') => void;
  dispatchMealCart: (manifestId: string, receivingNurse: string, temp: number) => void;
  dispatchMealWave: (wave: MealType, supervisor?: string) => void;
  createMealManifestForWard: (wardId: string, mealType: MealType) => void;
  addTrustFundTransaction: (patientId: string, type: 'DEPOSIT' | 'WITHDRAWAL' | 'PENSION_ALLOWANCE', amount: number, purpose: string, requester: string) => void;
  recordTrustFundTransaction: (patientId: string, type: 'DEPOSIT' | 'WITHDRAWAL', amount: number, reason: string) => void;
  admitOutpatientToWard: (opdItem: OPDQueueItem, wardId: string, bedNumber: string, dietaryType: DietaryType) => void;
  admitPatientToWard: (data: {
    full_name: string;
    mother_name?: string;
    ward_id: string;
    bed_number: string;
    dietary_type: DietaryType;
    admission_type?: any;
    primary_diagnosis?: string;
    risk_level?: any;
  }) => void;
  updatePatientDietary: (patientId: string, diet: DietaryType, notes?: string) => void;
  searchArchive: (query: string) => { results: Patient[]; total_searched: number; execution_time_ms: number };
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDomain, setActiveDomain] = useState<ActiveDomain>('OVERVIEW');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('CONSULTANT_PSYCHIATRIST');
  const [activeLanguage, setActiveLanguage] = useState<'ar' | 'en'>('ar');

  const [wards, setWards] = useState<WardInfo[]>(AL_RASHAD_WARDS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('p-001');
  const [mseRecords, setMseRecords] = useState<Record<string, MentalStatusExam>>(INITIAL_MSE_RECORDS);
  const [restraintLogs, setRestraintLogs] = useState<RestraintAuditLog[]>(INITIAL_RESTRAINT_LOGS);
  const [forensicOrders, setForensicOrders] = useState<ForensicLegalOrder[]>(INITIAL_FORENSIC_ORDERS);
  const [mealManifests, setMealManifests] = useState<MealManifest[]>(INITIAL_MEAL_MANIFESTS);
  const [controlledDrugs, setControlledDrugs] = useState<ControlledDrugVaultItem[]>(INITIAL_CONTROLLED_DRUGS);
  const [depotAlerts, setDepotAlerts] = useState<DepotInjectionAlert[]>(INITIAL_DEPOT_ALERTS);
  const [emarRecords, setEmarRecords] = useState<MedicationAdministrationRecord[]>(INITIAL_EMAR_RECORDS);
  const [trustFundTransactions, setTrustFundTransactions] = useState<TrustFundTransaction[]>(INITIAL_TRUST_FUND_TRANSACTIONS);
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [opdQueue, setOpdQueue] = useState<OPDQueueItem[]>(INITIAL_OPD_QUEUE);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerTargetAction, setScannerTargetAction] = useState<((code: string) => void) | undefined>();
  const [activePrintDoc, setActivePrintDoc] = useState<PrintDocumentPayload | null>(null);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addAuditLog = (action: string, actionAr: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user_id: 'usr-active',
      user_name: currentUserRole === 'CONSULTANT_PSYCHIATRIST' ? 'د. عمار فاروق الجنابي' :
                 currentUserRole === 'WARD_HEAD_NURSE' ? 'م. كاظم عيسى الدراجي' :
                 currentUserRole === 'KITCHEN_SUPERVISOR' ? 'السيد عماد عادل السامرائي' :
                 currentUserRole === 'SOCIAL_WORKER' ? 'الباحث كريم عبد الحسين' : 'موظف النظام',
      role: currentUserRole,
      action,
      action_ar: actionAr,
      target_resource: target,
      details,
      terminal_id: 'TERMINAL-RSH-SEC-W04',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const openBarcodeScanner = (onScan?: (code: string) => void) => {
    setScannerTargetAction(() => onScan);
    setIsScannerOpen(true);
  };

  const openPrintDocument = (doc: PrintDocumentPayload) => {
    setActivePrintDoc(doc);
    addAuditLog('DOCUMENT_PRINT_REQUESTED', 'طلب طباعة وثيقة رسمية مختومة', doc.title, `نوع الوثيقة: ${doc.type}`);
  };

  const closePrintDocument = () => {
    setActivePrintDoc(null);
  };

  // eMAR Administration Action
  const recordMedicationAdministration = (
    emarId: string, 
    status: 'GIVEN' | 'REFUSED' | 'OMITTED', 
    witnessName?: string
  ) => {
    setEmarRecords((prev) => prev.map((item) => {
      if (item.id === emarId) {
        const timeNow = new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
        
        // Log audit
        addAuditLog(
          `MEDICATION_${status}`,
          status === 'GIVEN' ? 'توثيق إعطاء جرعة دوائية' : status === 'REFUSED' ? 'رفض المريض للجرعة' : 'إسقاط جرعة دوائية',
          `${item.medication_name} - مريض: ${item.patient_name}`,
          `الجرعة: ${item.dosage} | الشاهد: ${witnessName || 'لا يوجد'} | الردهة: ${item.ward_id}`
        );

        // If it is a controlled psychotropic and GIVEN, deduct from vault
        if (item.is_controlled_psychotropic && status === 'GIVEN') {
          setControlledDrugs((drugs) => drugs.map((drug) => {
            if (item.medication_name.toLowerCase().includes(drug.generic_name.split(' ')[0].toLowerCase())) {
              const currentWardQty = drug.ward_distribution[item.ward_id] || 10;
              return {
                ...drug,
                ward_distribution: {
                  ...drug.ward_distribution,
                  [item.ward_id]: Math.max(0, currentWardQty - 1)
                },
                total_stock: Math.max(0, drug.total_stock - 1),
                daily_consumed: drug.daily_consumed + 1
              };
            }
            return drug;
          }));
        }

        return {
          ...item,
          status,
          administered_time: timeNow,
          administered_by_staff_name: 'م. رئيس ممرضين كاظم عيسى',
          witness_staff_name: witnessName || item.witness_staff_name
        };
      }
      return item;
    }));
  };

  // 15-Minute Restraint Observation Logger
  const add15MinRestraintCheck = (
    restraintId: string, 
    check: { vitalSigns: string; hydrationGiven: boolean; rangeOfMotion: boolean; behavior: string }
  ) => {
    const timeNow = new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
    const newCheck = {
      id: `chk-${Date.now()}`,
      time: timeNow,
      nurse_name: 'م. كاظم عيسى الدراجي',
      vital_signs: check.vitalSigns,
      hydration_nutrition_offered: check.hydrationGiven,
      range_of_motion_done: check.rangeOfMotion,
      patient_behavior: check.behavior
    };

    setRestraintLogs((prev) => prev.map((log) => {
      if (log.id === restraintId) {
        return {
          ...log,
          fifteen_min_checks: [...log.fifteen_min_checks, newCheck]
        };
      }
      return log;
    }));

    addAuditLog(
      'RESTRAINT_15MIN_OBSERVATION',
      'توثيق فحص الملاحظة التمريضية كل 15 دقيقة للنزيل المعزول',
      `Restraint ID: ${restraintId}`,
      `العلامات الحيوية: ${check.vitalSigns} | سوائل: ${check.hydrationGiven ? 'نعم' : 'لا'} | السلوك: ${check.behavior}`
    );
  };

  // Save Mental Status Exam
  const saveMSE = (mse: MentalStatusExam) => {
    setMseRecords((prev) => ({
      ...prev,
      [mse.patient_id]: mse
    }));
    addAuditLog(
      'MSE_EVALUATION_SAVED',
      'حفظ فحص الحالة العقلية الشامل (MSE)',
      `Patient: ${mse.patient_id}`,
      `الفاحص: ${mse.examiner_name} | درجة الاستبصار: ${mse.insight_judgment_grade}/6`
    );
  };

  // Forensic Legal Board Sign
  const signForensicReport = (
    orderId: string, 
    doctorName: string, 
    decision: 'RESPONSIBLE' | 'NOT_RESPONSIBLE_INSANE' | 'DIMINISHED_RESPONSIBILITY'
  ) => {
    const sigHash = `SIG-MOJ-IRQ-${Math.floor(100000 + Math.random() * 900000)}-RSH-VERIFIED`;
    const dateToday = new Date().toISOString().split('T')[0];

    setForensicOrders((prev) => prev.map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          committee_status: 'COMPLETED',
          legal_responsibility_decision: decision,
          digital_signature_hash: sigHash,
          signed_at: dateToday
        };
      }
      return ord;
    }));

    addAuditLog(
      'FORENSIC_REPORT_DIGITALLY_SIGNED',
      'التوقيع الرقمي المعتمد على تقرير اللجنة الطبية العدلية',
      `Legal Case: ${orderId}`,
      `الطبيب الموقع: ${doctorName} | القرار الجزائي: ${decision} | كود التوقيع: ${sigHash}`
    );
  };

  // Dispatch Meal Cart
  const dispatchMealCart = (manifestId: string, receivingNurse: string, temp: number) => {
    setMealManifests((prev) => prev.map((m) => {
      if (m.id === manifestId) {
        return {
          ...m,
          dispatch_status: 'RECEIVED_BY_WARD',
          receiving_nurse: receivingNurse,
          temperature_celsius: temp
        };
      }
      return m;
    }));

    addAuditLog(
      'MEAL_CART_CONFIRMED_AT_WARD',
      'تأكيد استلام عربة الوجبات في الردهة ومطابقة الحرارة',
      `Manifest: ${manifestId}`,
      `المستلم: ${receivingNurse} | الحرارة المقاسة: ${temp}°C`
    );
  };

  // Create Meal Manifest for Ward
  const createMealManifestForWard = (wardId: string, mealType: MealType) => {
    const ward = wards.find((w) => w.id === wardId);
    if (!ward) return;

    // Count patients in this ward according to dietary type
    const wardPatients = patients.filter((p) => p.ward_id === wardId && p.current_status === 'INPATIENT');
    const normalCount = wardPatients.filter((p) => p.dietary_type === 'NORMAL').length || Math.floor(ward.occupied_beds * 0.7);
    const diabeticCount = wardPatients.filter((p) => p.dietary_type === 'DIABETIC').length || Math.floor(ward.occupied_beds * 0.18);
    const lowSodiumCount = wardPatients.filter((p) => p.dietary_type === 'LOW_SODIUM').length || Math.floor(ward.occupied_beds * 0.08);
    const pureedCount = wardPatients.filter((p) => p.dietary_type === 'PUREED').length || Math.floor(ward.occupied_beds * 0.04);
    const total = normalCount + diabeticCount + lowSodiumCount + pureedCount;

    const newManifest: MealManifest = {
      id: `meal-${mealType.toLowerCase()}-${wardId}-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      meal_type: mealType,
      ward_id: wardId,
      ward_name: ward.arabic_name,
      normal_count: normalCount,
      diabetic_count: diabeticCount,
      low_sodium_count: lowSodiumCount,
      pureed_count: pureedCount,
      total_count: total,
      special_instructions: [
        'مطابقة أدوات المائدة البلاستيكية الآمنة وتدقيق حرارة الطعام',
        'عزل وجبات الحمية السكرية المخصصة وتوزيعها حسب السجل'
      ],
      dispatch_status: 'PREPARING',
      temperature_celsius: 75.0,
      kitchen_supervisor: 'السيد عماد عادل السامرائي (المطبخ المركزي)',
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })
    };

    setMealManifests((prev) => [newManifest, ...prev]);
    addAuditLog('MEAL_MANIFEST_GENERATED', 'توليد مانيفست وجبات الردهة تلقائياً', ward.arabic_name, `الوجبة: ${mealType} | العدد الكلي: ${total}`);
  };

  // Trust Fund Transaction
  const addTrustFundTransaction = (
    patientId: string, 
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'PENSION_ALLOWANCE', 
    amount: number, 
    purpose: string, 
    requester: string
  ) => {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    const currentBal = patient.trust_fund_balance;
    const newBal = type === 'WITHDRAWAL' ? Math.max(0, currentBal - amount) : currentBal + amount;

    // Update patient balance
    setPatients((prev) => prev.map((p) => p.id === patientId ? { ...p, trust_fund_balance: newBal } : p));

    const newTx: TrustFundTransaction = {
      id: `tr-${Date.now()}`,
      patient_id: patientId,
      patient_name: patient.full_name,
      archive_number: patient.archive_number,
      type,
      amount_iqd: amount,
      balance_after: newBal,
      date: new Date().toISOString().split('T')[0],
      requested_by: requester,
      authorized_by: 'الأستاذ أحمد كنعان (أمين صندوق أمانات المرضى)',
      purpose,
      receipt_number: `REC-IQD-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTrustFundTransactions((prev) => [newTx, ...prev]);
    addAuditLog(
      `TRUST_FUND_${type}`,
      type === 'WITHDRAWAL' ? 'صرف مالي من أمانات النزيل' : 'إيداع مالي في صندوق أمانات النزيل',
      patient.full_name,
      `المبلغ: ${amount.toLocaleString()} د.ع | الغرض: ${purpose} | الرصيد الجديد: ${newBal.toLocaleString()} د.ع`
    );
  };

  // Admit Outpatient to Inpatient Ward
  const admitOutpatientToWard = (
    opdItem: OPDQueueItem, 
    wardId: string, 
    bedNumber: string, 
    dietaryType: DietaryType
  ) => {
    const ward = wards.find((w) => w.id === wardId);
    const newArchiveNumber = `RSH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPatient: Patient = {
      id: `p-${Date.now()}`,
      archive_number: newArchiveNumber,
      national_id: opdItem.national_id,
      full_name: opdItem.patient_name,
      mother_name: 'قيد التوثيق الاجتماعي',
      gender: ward?.gender === 'FEMALE' ? 'FEMALE' : 'MALE',
      date_of_birth: '1995-01-01',
      age: 31,
      admission_type: opdItem.referral_source === 'POLICE_COURT' ? 'FORENSIC' : 'INVOLUNTARY_LEGAL',
      current_status: 'INPATIENT',
      ward_id: wardId,
      bed_number: bedNumber,
      dietary_type: dietaryType,
      trust_fund_balance: 0,
      risk_level: opdItem.triage_level === 'EMERGENCY_RED' ? 'EXTREME' : 'HIGH',
      suicide_risk: opdItem.triage_level === 'EMERGENCY_RED',
      violence_risk: opdItem.referral_source === 'POLICE_COURT',
      admission_date: new Date().toISOString().split('T')[0],
      photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      primary_diagnosis: opdItem.referral_details,
      icd11_code: '6A20',
      dsm5_code: '295.90',
      court_case_number: opdItem.referral_source === 'POLICE_COURT' ? 'قيد التدقيق القضائي' : undefined,
      allergies: []
    };

    setPatients((prev) => [newPatient, ...prev]);

    // Update ward occupied bed count
    setWards((prev) => prev.map((w) => w.id === wardId ? { ...w, occupied_beds: w.occupied_beds + 1 } : w));

    // Update OPD item status
    setOpdQueue((prev) => prev.map((item) => item.id === opdItem.id ? { ...item, status: 'ADMITTED' } : item));

    addAuditLog(
      'OPD_PATIENT_ADMITTED_TO_WARD',
      'إدخال مريض من الاستشارية إلى ردهات الرقود الداخلي',
      `${opdItem.patient_name} -> ${ward?.arabic_name}`,
      `تخصيص سرير: ${bedNumber} | الحمية الغذائية: ${dietaryType} | رقم الأرشيف المنشأ: ${newArchiveNumber}`
    );
  };

  // Direct admission helper for candidate
  const admitPatientToWard = (data: {
    full_name: string;
    mother_name?: string;
    ward_id: string;
    bed_number: string;
    dietary_type: DietaryType;
    admission_type?: any;
    primary_diagnosis?: string;
    risk_level?: any;
  }) => {
    const newArchiveNumber = `RSH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPatient: Patient = {
      id: `p-${Date.now()}`,
      archive_number: newArchiveNumber,
      full_name: data.full_name,
      mother_name: data.mother_name || 'غير مدون',
      gender: 'MALE',
      date_of_birth: '1995-01-01',
      age: 35,
      admission_type: data.admission_type || 'INVOLUNTARY_CIVIL',
      current_status: 'INPATIENT',
      ward_id: data.ward_id,
      bed_number: data.bed_number,
      dietary_type: data.dietary_type,
      trust_fund_balance: 0,
      risk_level: data.risk_level || 'HIGH',
      suicide_risk: false,
      violence_risk: false,
      admission_date: new Date().toISOString().split('T')[0],
      photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      primary_diagnosis: data.primary_diagnosis || 'ذهان حاد قيد التقييم والاستقرار السريري',
      icd11_code: '6A20',
      dsm5_code: '295.90',
      allergies: []
    };

    setPatients((prev) => [newPatient, ...prev]);
    setWards((prev) => prev.map((w) => w.id === data.ward_id ? { ...w, occupied_beds: Math.min(w.total_beds, w.occupied_beds + 1) } : w));
    addAuditLog(
      'PATIENT_ADMITTED_TO_WARD',
      'إدخال مريض جديد للرقود الداخلي بالردهة',
      newPatient.full_name,
      `رقم الأرشيف: ${newArchiveNumber} | الردهة: ${data.ward_id} | السرير: ${data.bed_number} | الحمية: ${data.dietary_type}`
    );
  };

  // Record trust fund helper
  const recordTrustFundTransaction = (
    patientId: string, 
    type: 'DEPOSIT' | 'WITHDRAWAL', 
    amount: number, 
    reason: string
  ) => {
    addTrustFundTransaction(patientId, type, amount, reason, 'الباحث الاجتماعي / مسؤول أمانات المرضى');
  };

  // Quad-meal wave state
  const [mealWaves, setMealWaves] = useState<Array<{
    id: string;
    wave: MealType;
    arabic_name: string;
    scheduled_time: string;
    menu_description: string;
    temperature_celsius: number;
    status: 'COOKING' | 'PREPARED' | 'COMPLETED';
  }>>([
    {
      id: 'wave-01',
      wave: 'BREAKFAST',
      arabic_name: 'وجبة الإفطار (الصباحية)',
      scheduled_time: '07:00 - 08:30',
      menu_description: 'بيض مسلوق، جبن أبيض عراقي مبستر، شاي، خبز طازج (حمية سكري: خالي من السكر)',
      temperature_celsius: 68.5,
      status: 'COMPLETED'
    },
    {
      id: 'wave-02',
      wave: 'LUNCH',
      arabic_name: 'وجبة الغداء (الرئيسية)',
      scheduled_time: '12:30 - 14:00',
      menu_description: 'تمن ومرق فاصوليا مع لحم غنم مسلوق، لبن رائب، سلطة طازجة (حمية مهروسة متوفرة)',
      temperature_celsius: 76.2,
      status: 'PREPARED'
    },
    {
      id: 'wave-03',
      wave: 'AFTERNOON_SNACK',
      arabic_name: 'وجبة العصرية (الخفيفة)',
      scheduled_time: '16:30 - 17:30',
      menu_description: 'فاكهة طازجة (تفاح/برتقال)، بسكويت مدعم، حليب دافئ أو شاي',
      temperature_celsius: 65.0,
      status: 'COOKING'
    },
    {
      id: 'wave-04',
      wave: 'DINNER',
      arabic_name: 'وجبة العشاء (المسائية)',
      scheduled_time: '19:30 - 20:30',
      menu_description: 'شوربة عدس مغذية، كبة برغل، لبن، خبز رقيق، خضروات مسلوقة',
      temperature_celsius: 73.0,
      status: 'COOKING'
    }
  ]);

  const dispatchMealWave = (wave: MealType, supervisor?: string) => {
    setMealWaves((prev) => prev.map((w) => w.wave === wave ? { ...w, status: 'COMPLETED' } : w));
    addAuditLog(
      'MEAL_WAVE_DISPATCHED',
      'إطلاق وتوزيع وجبة طعام لجميع ردهات الحرم (1,500 نزيل)',
      wave,
      `إشراف: ${supervisor || 'عماد السامرائي'} | الوجبة: ${wave} | تم تسيير 12 عربة حرارية`
    );
  };

  // Search Archive helper
  const searchArchive = (query: string) => {
    const res = searchArchiveSub50ms(query);
    const cleanQ = query.trim().toLowerCase();
    const matchedPatients = patients.filter((p) => 
      p.full_name.includes(cleanQ) ||
      p.archive_number.toLowerCase().includes(cleanQ) ||
      p.mother_name.includes(cleanQ) ||
      p.primary_diagnosis.includes(cleanQ)
    );
    return {
      results: matchedPatients.length > 0 ? matchedPatients : patients.slice(0, 4),
      total_searched: res.totalScanned,
      execution_time_ms: res.durationMs
    };
  };

  const currentUser = {
    id: 'usr-active',
    name: currentUserRole === 'CONSULTANT_PSYCHIATRIST' ? 'د. عمار فاروق الجنابي' :
          currentUserRole === 'WARD_HEAD_NURSE' ? 'م. كاظم عيسى الدراجي' :
          currentUserRole === 'KITCHEN_SUPERVISOR' ? 'السيد عماد عادل السامرائي' :
          currentUserRole === 'SOCIAL_WORKER' ? 'الباحث كريم عبد الحسين' : 'موظف النظام',
    role: currentUserRole
  };

  // Update Patient Dietary Type
  const updatePatientDietary = (patientId: string, diet: DietaryType, notes?: string) => {
    setPatients((prev) => prev.map((p) => p.id === patientId ? { ...p, dietary_type: diet, dietary_notes: notes || p.dietary_notes } : p));
    addAuditLog('PATIENT_DIETARY_MODIFIED', 'تحديث الحمية الطبية الغذائية للمريض', `Patient: ${patientId}`, `نوع الحمية الجديد: ${diet}`);
  };

  return (
    <HospitalContext.Provider
      value={{
        activeDomain,
        setActiveDomain,
        currentUserRole,
        setCurrentUserRole,
        currentUser,
        activeLanguage,
        setActiveLanguage,
        wards,
        patients,
        selectedPatientId,
        setSelectedPatientId,
        mseRecords,
        restraintLogs,
        forensicOrders,
        mealManifests,
        mealWaves,
        controlledDrugs,
        depotAlerts,
        emarRecords,
        trustFundTransactions,
        staffList,
        auditLogs,
        opdQueue,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isScannerOpen,
        setIsScannerOpen,
        scannerTargetAction,
        openBarcodeScanner,
        activePrintDoc,
        openPrintDocument,
        closePrintDocument,
        recordMedicationAdministration,
        add15MinRestraintCheck,
        saveMSE,
        signForensicReport,
        dispatchMealCart,
        dispatchMealWave,
        createMealManifestForWard,
        addTrustFundTransaction,
        recordTrustFundTransaction,
        admitOutpatientToWard,
        admitPatientToWard,
        updatePatientDietary,
        searchArchive
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
