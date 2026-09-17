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
  RestraintAuditLog,
  MentalStatusExam,
  PatientValuableAsset
} from '../types';

export const AL_RASHAD_WARDS: WardInfo[] = [
  {
    id: 'ward-01',
    name: 'Ward 1 - Male Acute Psychiatry',
    arabic_name: 'ردهة 1 - رجال (حالات حادة وشديدة)',
    building_zone: 'Zone A - المبنى الأكاديمي',
    gender: 'MALE',
    total_beds: 125,
    occupied_beds: 124,
    seclusion_beds: 4,
    head_nurse: 'م. أقدم حيدر كريم العبيدي',
    doctor_in_charge: 'د. صادق مهدي الساعدي (استشاري)',
    contact_extension: '101'
  },
  {
    id: 'ward-02',
    name: 'Ward 2 - Male Subacute & Observation',
    arabic_name: 'ردهة 2 - رجال (دون الحادة والملاحظة المستمرة)',
    building_zone: 'Zone A - الجناح الغربي',
    gender: 'MALE',
    total_beds: 130,
    occupied_beds: 128,
    seclusion_beds: 2,
    head_nurse: 'م. جامعي علي جاسم الموسوي',
    doctor_in_charge: 'د. وسام قاسم الخفاجي (اختصاص)',
    contact_extension: '102'
  },
  {
    id: 'ward-03',
    name: 'Ward 3 - Male Chronic Long-Stay A',
    arabic_name: 'ردهة 3 - رجال (إقامة طويلة مزمنة - أ)',
    building_zone: 'Zone B - مجمع الرعاية الممتدة',
    gender: 'MALE',
    total_beds: 150,
    occupied_beds: 150,
    seclusion_beds: 0,
    head_nurse: 'م. فاضل هادي الشمري',
    doctor_in_charge: 'د. مصطفى حميد الزبيدي',
    contact_extension: '103'
  },
  {
    id: 'ward-04',
    name: 'Ward 4 - Forensic Maximum Security Male',
    arabic_name: 'ردهة 4 - الطب النفسي العدلي (رجال - إيداع قضائي مشدد)',
    building_zone: 'Zone C - المجمع العدلي المؤمن',
    gender: 'FORENSIC',
    total_beds: 140,
    occupied_beds: 139,
    seclusion_beds: 8,
    head_nurse: 'م. رئيس ممرضين كاظم عيسى الدراجي',
    doctor_in_charge: 'د. عمار فاروق الجنابي (استشاري عدلي)',
    contact_extension: '104'
  },
  {
    id: 'ward-05',
    name: 'Ward 5 - Male Chronic Long-Stay B',
    arabic_name: 'ردهة 5 - رجال (إقامة طويلة مزمنة - ب)',
    building_zone: 'Zone B - مجمع الرعاية الممتدة',
    gender: 'MALE',
    total_beds: 150,
    occupied_beds: 148,
    seclusion_beds: 1,
    head_nurse: 'م. حسام رحيم البديري',
    doctor_in_charge: 'د. أركان مجيد التميمي',
    contact_extension: '105'
  },
  {
    id: 'ward-06',
    name: 'Ward 6 - Occupational Therapy & Rehab Male',
    arabic_name: 'ردهة 6 - التأهيل النفسي والاجتماعي والعلاج بالعمل',
    building_zone: 'Zone E - ورش العمل والحدائق العلاجية',
    gender: 'MALE',
    total_beds: 110,
    occupied_beds: 106,
    seclusion_beds: 0,
    head_nurse: 'م. رائد نصير الربيعي',
    doctor_in_charge: 'د. هدى عبد الرحمن الراوي',
    contact_extension: '106'
  },
  {
    id: 'ward-07',
    name: 'Ward 7 - Female Acute Psychiatry',
    arabic_name: 'ردهة 7 - نساء (حالات حادة وطوارئ نسائية)',
    building_zone: 'Zone D - مجمع الأجنحة النسائية',
    gender: 'FEMALE',
    total_beds: 120,
    occupied_beds: 119,
    seclusion_beds: 3,
    head_nurse: 'م. جامعية زينب عبد الأمير الموسوي',
    doctor_in_charge: 'د. ميسون إبراهيم القيسي (استشارية)',
    contact_extension: '107'
  },
  {
    id: 'ward-08',
    name: 'Ward 8 - Female Chronic Long-Stay',
    arabic_name: 'ردهة 8 - نساء (إقامة طويلة ورعاية مزمنة)',
    building_zone: 'Zone D - مجمع الأجنحة النسائية',
    gender: 'FEMALE',
    total_beds: 140,
    occupied_beds: 139,
    seclusion_beds: 1,
    head_nurse: 'م. سوسن جعفر العامري',
    doctor_in_charge: 'د. نادية جبار الحمداني',
    contact_extension: '108'
  },
  {
    id: 'ward-09',
    name: 'Ward 9 - Forensic Female Ward',
    arabic_name: 'ردهة 9 - نساء (إيداع قضائي وملاحظة عدلية)',
    building_zone: 'Zone C - المجمع العدلي المؤمن',
    gender: 'FORENSIC',
    total_beds: 75,
    occupied_beds: 73,
    seclusion_beds: 3,
    head_nurse: 'م. إخلاص عبد الصاحب الوائلي',
    doctor_in_charge: 'د. سارة منذر الكرخي',
    contact_extension: '109'
  },
  {
    id: 'ward-10',
    name: 'Ward 10 - Geriatric Psychiatry',
    arabic_name: 'ردهة 10 - الطب النفسي للمسنين والاضطرابات الإدراكية',
    building_zone: 'Zone F - واحة كبار السن',
    gender: 'MALE',
    total_beds: 120,
    occupied_beds: 118,
    seclusion_beds: 0,
    head_nurse: 'م. عباس لطيف الكناني',
    doctor_in_charge: 'د. ضياء كامل البصري',
    contact_extension: '110'
  },
  {
    id: 'ward-11',
    name: 'Ward 11 - Dual Diagnosis & Addiction Recovery',
    arabic_name: 'ردهة 11 - التشخيص المزدوج وعلاج الإدمان والمؤثرات',
    building_zone: 'Zone G - جناح التعافي والتأهيل التخصصي',
    gender: 'MALE',
    total_beds: 110,
    occupied_beds: 109,
    seclusion_beds: 2,
    head_nurse: 'م. كرار حيدر الشويلي',
    doctor_in_charge: 'د. بلال طه التكريتي',
    contact_extension: '111'
  },
  {
    id: 'ward-12',
    name: 'Ward 12 - Extended Care & Palliative',
    arabic_name: 'ردهة 12 - الرعاية الممتدة والتلطيفية طويلة الأمد',
    building_zone: 'Zone B - مجمع الرعاية الممتدة',
    gender: 'MALE',
    total_beds: 130,
    occupied_beds: 128,
    seclusion_beds: 0,
    head_nurse: 'م. مهند شاكر الكلابي',
    doctor_in_charge: 'د. لمياء نوري الهاشمي',
    contact_extension: '112'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p-001',
    archive_number: 'RSH-1994-01842',
    national_id: '197482910481',
    full_name: 'جاسم محمد كاظم حسن العبيدي',
    mother_name: 'فاطمة جواد',
    gender: 'MALE',
    date_of_birth: '1974-05-12',
    age: 52,
    admission_type: 'FORENSIC',
    current_status: 'INPATIENT',
    ward_id: 'ward-04',
    bed_number: 'C4-08',
    dietary_type: 'DIABETIC',
    dietary_notes: 'حمية سكري 1800 سعرة + مراقبة السكر بعد الوجبات',
    trust_fund_balance: 485000,
    risk_level: 'HIGH',
    suicide_risk: false,
    violence_risk: true,
    admission_date: '2021-08-14',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'الفصام البارانويدي المزمن المعند (Paranoid Schizophrenia)',
    icd11_code: '6A20.0',
    dsm5_code: '295.90',
    secondary_diagnosis: 'داء السكري النمط الثاني غير المعتمد على الأنسولين',
    court_case_number: '1428/جنايات/2021',
    custody_court: 'محكمة جنايات الرصافة الهيئة الأولى',
    allergies: ['Penicillin', 'Sulfa drugs']
  },
  {
    id: 'p-002',
    archive_number: 'RSH-2003-08912',
    national_id: '198894102941',
    full_name: 'حسين علي رضا عبد الخالق الموسوي',
    mother_name: 'زينب هادي',
    gender: 'MALE',
    date_of_birth: '1988-11-20',
    age: 38,
    admission_type: 'INVOLUNTARY_LEGAL',
    current_status: 'INPATIENT',
    ward_id: 'ward-01',
    bed_number: 'A1-14',
    dietary_type: 'NORMAL',
    trust_fund_balance: 120000,
    risk_level: 'EXTREME',
    suicide_risk: true,
    violence_risk: true,
    admission_date: '2024-02-10',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'اضطراب وجداني ثنائي القطب، نوبة هوسية حادة مع أعراض ذهانية (Bipolar I Disorder)',
    icd11_code: '6A60.1',
    dsm5_code: '296.44',
    secondary_diagnosis: 'محاولة انتحار سابقة + إفراط استخدام مهدئات',
    allergies: []
  },
  {
    id: 'p-003',
    archive_number: 'RSH-1988-00431',
    national_id: '196120194012',
    full_name: 'كاظم شنيشل ثجيل مري العتابي',
    mother_name: 'حمدية صخي',
    gender: 'MALE',
    date_of_birth: '1961-03-04',
    age: 65,
    admission_type: 'VOLUNTARY',
    current_status: 'INPATIENT',
    ward_id: 'ward-03',
    bed_number: 'B3-42',
    dietary_type: 'LOW_SODIUM',
    dietary_notes: 'قليل الصوديوم (مرضى ارتفاع ضغط الدم والقصور القلبي)',
    trust_fund_balance: 1450000,
    risk_level: 'LOW',
    suicide_risk: false,
    violence_risk: false,
    admission_date: '1998-05-19',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'الفصام المتبقي المزمن مع تدهور إدراكي واجتماعي (Residual Schizophrenia)',
    icd11_code: '6A20.3',
    dsm5_code: '295.90',
    secondary_diagnosis: 'ارتفاع ضغط الدم الشرياني الأساسي',
    allergies: ['Aspirin']
  },
  {
    id: 'p-004',
    archive_number: 'RSH-2015-04190',
    national_id: '199248102931',
    full_name: 'سحر عبد الرزاق خضير عباس الطائي',
    mother_name: 'رجاء سلمان',
    gender: 'FEMALE',
    date_of_birth: '1992-09-15',
    age: 34,
    admission_type: 'FORENSIC',
    current_status: 'INPATIENT',
    ward_id: 'ward-09',
    bed_number: 'C9-04',
    dietary_type: 'PUREED',
    dietary_notes: 'طعام مهروس ناعم لخلل بالبلع مترافق مع خلل حركة متأخر',
    trust_fund_balance: 780000,
    risk_level: 'HIGH',
    suicide_risk: true,
    violence_risk: false,
    admission_date: '2022-11-03',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'اضطراب فصامي عاطفي، النمط الاكتئابي مع وساوس وضلالات عدمية',
    icd11_code: '6A21.1',
    dsm5_code: '295.70',
    court_case_number: '782/تحقيق الكرخ/2022',
    custody_court: 'محكمة تحقيق الكرخ الثانية',
    allergies: ['Haloperidol (Severe Extrapyramidal Reactions)']
  },
  {
    id: 'p-005',
    archive_number: 'RSH-1979-00088',
    national_id: '195249018294',
    full_name: 'مهدي صالح عمران فنجان اللامي',
    mother_name: 'صبيحة كاظم',
    gender: 'MALE',
    date_of_birth: '1952-01-10',
    age: 74,
    admission_type: 'INVOLUNTARY_LEGAL',
    current_status: 'INPATIENT',
    ward_id: 'ward-10',
    bed_number: 'F10-18',
    dietary_type: 'PUREED',
    dietary_notes: 'وجبات لينة ومهروسة تحت إشراف ممرض مباشر لتجنب الاستنشاق الرئوي',
    trust_fund_balance: 2310000,
    risk_level: 'MEDIUM',
    suicide_risk: false,
    violence_risk: false,
    admission_date: '1984-07-21',
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'خرف الشيخوخة الوعائي المختلط مع اضطرابات سلوكية وذهانية',
    icd11_code: '6D81',
    dsm5_code: '290.40',
    allergies: []
  },
  {
    id: 'p-006',
    archive_number: 'RSH-2023-09811',
    full_name: 'مجهول الهوية رقم 14 (أحيل من شرطة النجدة)',
    mother_name: 'غير معروفة',
    gender: 'MALE',
    date_of_birth: '1996-01-01',
    age: 30,
    admission_type: 'FORENSIC',
    current_status: 'INPATIENT',
    ward_id: 'ward-04',
    bed_number: 'C4-19',
    dietary_type: 'NORMAL',
    trust_fund_balance: 0,
    risk_level: 'HIGH',
    suicide_risk: false,
    violence_risk: true,
    admission_date: '2023-12-05',
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'ذهان حاد مجهول المنشأ مع حالة خرس اختياري وشكوكية شديدة',
    icd11_code: '6A23',
    dsm5_code: '298.8',
    is_unidentified: true,
    fingerprint_hash: 'FP-SHA256-9A8C7B1E4D3F0198A72B3C8',
    court_case_number: 'مجهول/51/رصافة/2023',
    custody_court: 'محكمة تحقيق الشعب',
    allergies: []
  },
  {
    id: 'p-007',
    archive_number: 'RSH-2020-05411',
    national_id: '199510294812',
    full_name: 'ضرغام وسام بدر عذاب الخيكاني',
    mother_name: 'منى حامد',
    gender: 'MALE',
    date_of_birth: '1995-07-28',
    age: 31,
    admission_type: 'INVOLUNTARY_LEGAL',
    current_status: 'INPATIENT',
    ward_id: 'ward-11',
    bed_number: 'G11-09',
    dietary_type: 'NORMAL',
    trust_fund_balance: 310000,
    risk_level: 'HIGH',
    suicide_risk: true,
    violence_risk: true,
    admission_date: '2024-01-18',
    photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'ذهان مستحث بمادة الكريستال ميث (الميثامفيتامين) والكبتاجون مع تشخيص مزدوج',
    icd11_code: '6C46.1',
    dsm5_code: '292.9',
    secondary_diagnosis: 'اضطراب الشخصية المعادية للمجتمع (Antisocial Personality)',
    allergies: []
  },
  {
    id: 'p-008',
    archive_number: 'RSH-2018-03290',
    national_id: '198540192841',
    full_name: 'وفاء كريم جبار ناصر التميمي',
    mother_name: 'أزهار لطيف',
    gender: 'FEMALE',
    date_of_birth: '1985-04-18',
    age: 41,
    admission_type: 'VOLUNTARY',
    current_status: 'INPATIENT',
    ward_id: 'ward-07',
    bed_number: 'D7-22',
    dietary_type: 'DIABETIC',
    dietary_notes: 'سكر منضبط، وجبات خفيفة إضافية الساعة 16:30',
    trust_fund_balance: 620000,
    risk_level: 'MEDIUM',
    suicide_risk: true,
    violence_risk: false,
    admission_date: '2023-04-12',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    primary_diagnosis: 'اضطراب اكتئابي جسيم ناكس مع سمات ذهانية وسوداوية',
    icd11_code: '6A71.3',
    dsm5_code: '296.34',
    allergies: ['Citalopram']
  }
];

export const INITIAL_MSE_RECORDS: Record<string, MentalStatusExam> = {
  'p-001': {
    id: 'mse-001',
    patient_id: 'p-001',
    assessment_date: '2026-09-15',
    examiner_name: 'د. عمار فاروق الجنابي',
    appearance_grooming: 'ملابس المستشفى نظيفة، شعر ولحية مشذبة جزئياً، هيئة حذرة وشاخصة متيقظة للمحيط.',
    behavior_psychomotor: 'تململ حركي طفيف، شكوكية واضحة ونظرات متوجسة نحو الأبواب، عدم ارتياح للمحادثة المطولة.',
    speech_characteristics: 'نبرة صوت منخفضة ورتيبة، سرعة طبيعية لكن يتوقف فجأة وكأنه يستمع لأصوات خارجية.',
    mood_subjective: 'المريض يصف مزاجه بأنه "محاصر ومراقب من أجهزة خفية".',
    affect_objective: 'تبلد وجداني واضح (Blunted Affect) مع عدم تطابق عند الحديث عن أمور خطيرة.',
    thought_process: 'تفكك ترابطي طفيف، تطاير أفكار عند إثارة موضوع القضية القضائية، تفكير مشوش جزئياً.',
    thought_content: 'ضلالات اضطهاد منظمة (Delusions of Persecution) وضلالات إشارة بأن الممرضين يرسلون إشارات مشفرة.',
    perception: 'هلاوس سمعية أمرية (Auditory Hallucinations) مستمرة تعلق على أفعاله.',
    cognition_orientation: 'مدرك للزمان والمكان والأشخاص بشكل سليم (Oriented x3).',
    insight_judgment_grade: 1, // Complete denial of illness
    clinical_summary: 'فصام بارانويدي مزمن مقاوم للعلاج الدوائي، استبصار معدوم (الدرجة 1)، يشكل خطورة على الآخرين في حال الاستجابة للهلاوس الأمرية.'
  },
  'p-002': {
    id: 'mse-002',
    patient_id: 'p-002',
    assessment_date: '2026-09-16',
    examiner_name: 'د. صادق مهدي الساعدي',
    appearance_grooming: 'ملامح الإرهاق، عيون حمراء محتقنة، فرط نشاط وحركات لا إرادية سريعة.',
    behavior_psychomotor: 'هياج حركي ونفسي شديد، يتجول باستمرار في الغرفة، نوبات غضب سريعة ومفاجئة.',
    speech_characteristics: 'كلام ضاغط وسريع جداً (Pressured Speech)، صاخب وعالي النبرة مع صعوبة مقاطعته.',
    mood_subjective: 'مزاج استعلائي متعالٍ ومتقلب (Irritable & Euphoric).',
    affect_objective: 'وجداني متقلب وغير مستقر، ينتقل من الضحك العالي إلى التهديد اللفظي بلحظات.',
    thought_process: 'طيران الأفكار (Flight of Ideas)، تداعي بالأصوات والسجع، تفكير متفرع لا ينتهي.',
    thought_content: 'ضلالات عظمة مفرطة (Grandiose Delusions) يدعي أنه مكلف بإنقاذ العالم وقوى خارقة.',
    perception: 'لا هلاوس سمعية واضحة حالياً، فرط استجابة للمؤثرات الحسية والضوضاء.',
    cognition_orientation: 'مدرك للأشخاص، تقدير مشوش للزمان (يعتقد أن ساعات الليل هي النهار).',
    insight_judgment_grade: 1,
    clinical_summary: 'نوبة هوسية حادة وشديدة مع أعراض ذهانية، خطورة عالية للاعتداء والإنهاك الجسدي، تحت الملاحظة اللصيقة 15 دقيقة.'
  }
};

export const INITIAL_RESTRAINT_LOGS: RestraintAuditLog[] = [
  {
    id: 'rst-001',
    patient_id: 'p-002',
    patient_name: 'حسين علي رضا عبد الخالق الموسوي',
    ward_id: 'ward-01',
    type: 'SECLUSION_ROOM',
    start_time: '2026-09-17 01:15',
    authorized_by_doctor: 'د. صادق مهدي الساعدي (أمر طوارئ رقم 92)',
    authorization_reason: 'هياج نفسي حركي حاد وتكسير أثاث الردهة والتهديد المباشر بالاعتداء الجسدي على التمريض',
    active: true,
    fifteen_min_checks: [
      {
        id: 'chk-01',
        time: '01:30',
        nurse_name: 'م. حيدر كريم العبيدي',
        vital_signs: 'ضغط: 145/90 | نبض: 104 | أكسجين: 98%',
        hydration_nutrition_offered: true,
        range_of_motion_done: false,
        patient_behavior: 'يصرخ ويطرق على باب غرفة العزل، يرفض شرب الماء، لا علامات أذى جسدي مباشر.'
      },
      {
        id: 'chk-02',
        time: '01:45',
        nurse_name: 'م. حيدر كريم العبيدي',
        vital_signs: 'ضغط: 140/85 | نبض: 98 | أكسجين: 99%',
        hydration_nutrition_offered: true,
        range_of_motion_done: false,
        patient_behavior: 'هدوء نسبي، جلس على الأرض يتنفس بعمق، تم إعطاء 200 مل ماء بإشراف مباشر.'
      },
      {
        id: 'chk-03',
        time: '02:00',
        nurse_name: 'م. علي جاسم الموسوي',
        vital_signs: 'ضغط: 130/82 | نبض: 86 | أكسجين: 98%',
        hydration_nutrition_offered: false,
        range_of_motion_done: false,
        patient_behavior: 'مستلقٍ على السرير، التنفس منتظم، يهدأ تدريجياً بعد مفعول المهدئ العضلي.'
      }
    ]
  }
];

export const INITIAL_FORENSIC_ORDERS: ForensicLegalOrder[] = [
  {
    id: 'leg-001',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    court_name: 'محكمة جنايات الرصافة الهيئة الأولى',
    case_number: '1428/جنايات/2021',
    legal_article: 'المادة 78 عقوبات (إيداع في مأوى احترازي للمصابين بعاهة عقلية)',
    order_date: '2021-08-10',
    observation_end_date: '2026-10-15',
    committee_status: 'SCHEDULED',
    committee_type: '5_DOCTOR',
    committee_members: [
      'د. عمار فاروق الجنابي (رئيس اللجنة العدلية)',
      'د. صادق مهدي الساعدي (عضو استشاري)',
      'د. ميسون إبراهيم القيسي (عضو استشاري)',
      'د. بلال طه التكريتي (عضو اختصاص)',
      'د. وسام قاسم الخفاجي (عضو اختصاص)'
    ],
    findings_summary: 'المودع مصاب بفصام عقلي مزمن معند غير مستجيب للأدوية التقليدية، فاقد للأهلية الجنائية والإدراك وقت ارتكاب الفعل، يشكل خطراً مستمراً على السلامة العامة.',
    legal_responsibility_decision: 'NOT_RESPONSIBLE_INSANE',
    requires_continued_detention: true,
    digital_signature_hash: 'SIG-MOJ-IRQ-849102-RSH-COMM-5D',
    signed_at: '2026-09-10'
  },
  {
    id: 'leg-002',
    patient_id: 'p-004',
    patient_name: 'سحر عبد الرزاق خضير عباس الطائي',
    court_name: 'محكمة تحقيق الكرخ الثانية',
    case_number: '782/تحقيق الكرخ/2022',
    legal_article: 'المادة 80 عقوبات (فحص الحالة العقلية لبيان المسؤولية الجزائية والقدرة على المثول للمحاكمة)',
    order_date: '2022-10-25',
    observation_end_date: '2026-09-28',
    committee_status: 'PENDING',
    committee_type: '3_DOCTOR',
    committee_members: [
      'د. ميسون إبراهيم القيسي (رئيسة اللجنة)',
      'د. سارة منذر الكرخي (عضو اختصاص)',
      'د. هدى عبد الرحمن الراوي (عضو اختصاص)'
    ],
    findings_summary: 'قيد الملاحظة السريرية المستمرة في الردهة التاسعة، إعداد الفحوص النفسية والاختبارات التخطيطية لاستكمال التقرير النهائي.',
    legal_responsibility_decision: 'DIMINISHED_RESPONSIBILITY',
    requires_continued_detention: true
  },
  {
    id: 'leg-003',
    patient_id: 'p-006',
    patient_name: 'مجهول الهوية رقم 14 (أحيل من شرطة النجدة)',
    court_name: 'محكمة تحقيق الشعب',
    case_number: 'مجهول/51/رصافة/2023',
    legal_article: 'المادة 60 عقوبات وقانون رعاية الصحة النفسية (حفظ وإيداع لتعذر التحقيق لمرض عقلي جسيم)',
    order_date: '2023-12-01',
    observation_end_date: '2026-11-30',
    committee_status: 'COMPLETED',
    committee_type: '3_DOCTOR',
    findings_summary: 'المريض غير قادر على الإدلاء بإفادته بسبب حالة ذهانية حادة مصحوبة بخرس اختياري، تم أخذ الطبعات العشرية وإرسالها للأدلة الجنائية لمطابقة الهوية.',
    legal_responsibility_decision: 'NOT_RESPONSIBLE_INSANE',
    requires_continued_detention: true,
    digital_signature_hash: 'SIG-MOJ-IRQ-001948-RSH-COMM-3D',
    signed_at: '2026-08-14'
  }
];

export const INITIAL_CONTROLLED_DRUGS: ControlledDrugVaultItem[] = [
  {
    id: 'cd-01',
    generic_name: 'Haloperidol Decanoate (Depot)',
    brand_name: 'Haldol Decanoate 50mg/ml',
    formulation: 'أمبولات عضلية زيتية ممتدة المفعول (Depot IM)',
    central_store_balance: 450,
    ward_distribution: { 'ward-01': 24, 'ward-03': 40, 'ward-04': 50, 'ward-05': 45, 'ward-08': 30 },
    total_stock: 639,
    schedule_class: 'SCHEDULE_II',
    batch_number: 'HAL-IRQ-2025-99B',
    expiry_date: '2027-11-30',
    requires_double_sign: true,
    daily_consumed: 14
  },
  {
    id: 'cd-02',
    generic_name: 'Clozapine 100mg',
    brand_name: 'Clozaril / Leponex',
    formulation: 'أقراص فموية 100 ملغ (يتطلب فحص الدم التراكمي الشامل CBC/ANC)',
    central_store_balance: 3200,
    ward_distribution: { 'ward-01': 180, 'ward-04': 240, 'ward-07': 120, 'ward-09': 90 },
    total_stock: 3830,
    schedule_class: 'SCHEDULE_II',
    batch_number: 'CLZ-2024-08X',
    expiry_date: '2027-04-15',
    requires_double_sign: true,
    daily_consumed: 86
  },
  {
    id: 'cd-03',
    generic_name: 'Diazepam 10mg/2ml',
    brand_name: 'Valium',
    formulation: 'أمبولات للحقن الوريدي/العضلي (Schedule I Controlled Vault)',
    central_store_balance: 180,
    ward_distribution: { 'ward-01': 15, 'ward-02': 10, 'ward-04': 20, 'ward-07': 12, 'ward-11': 18 },
    total_stock: 255,
    schedule_class: 'SCHEDULE_I',
    batch_number: 'DZP-SDI-2025-01',
    expiry_date: '2026-12-31',
    requires_double_sign: true,
    daily_consumed: 9
  },
  {
    id: 'cd-04',
    generic_name: 'Paliperidone Palmitate 100mg',
    brand_name: 'Invega Sustenna',
    formulation: 'حقن عضلية ممتدة المفعول شهرياً (Monthly LAI)',
    central_store_balance: 120,
    ward_distribution: { 'ward-01': 12, 'ward-04': 18, 'ward-06': 10, 'ward-08': 14 },
    total_stock: 174,
    schedule_class: 'SCHEDULE_II',
    batch_number: 'PAL-2025-41A',
    expiry_date: '2027-08-20',
    requires_double_sign: true,
    daily_consumed: 4
  },
  {
    id: 'cd-05',
    generic_name: 'Clonazepam 2mg',
    brand_name: 'Rivotril 2mg',
    formulation: 'أقراص فموية 2 ملغ مقسمة',
    central_store_balance: 1400,
    ward_distribution: { 'ward-01': 90, 'ward-04': 110, 'ward-07': 60, 'ward-11': 80 },
    total_stock: 1740,
    schedule_class: 'SCHEDULE_I',
    batch_number: 'CNZ-2024-55C',
    expiry_date: '2026-10-30',
    requires_double_sign: true,
    daily_consumed: 32
  }
];

export const INITIAL_DEPOT_ALERTS: DepotInjectionAlert[] = [
  {
    id: 'dep-01',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    ward_id: 'ward-04',
    medication: 'Haloperidol Decanoate 100mg IM',
    dosage: '100 ملغ حقنة عضلية عميقة',
    interval_days: 28,
    last_administered_date: '2026-08-20',
    next_due_date: '2026-09-17', // Today
    days_overdue_or_remaining: 0,
    status: 'DUE_TODAY'
  },
  {
    id: 'dep-02',
    patient_id: 'p-003',
    patient_name: 'كاظم شنيشل ثجيل مري العتابي',
    ward_id: 'ward-03',
    medication: 'Fluphenazine Decanoate 25mg IM',
    dosage: '25 ملغ كل أسبوعين',
    interval_days: 14,
    last_administered_date: '2026-09-08',
    next_due_date: '2026-09-22',
    days_overdue_or_remaining: 5,
    status: 'UPCOMING'
  },
  {
    id: 'dep-03',
    patient_id: 'p-007',
    patient_name: 'ضرغام وسام بدر عذاب الخيكاني',
    ward_id: 'ward-11',
    medication: 'Paliperidone Palmitate 100mg IM',
    dosage: '100 ملغ عضلي شهرياً',
    interval_days: 28,
    last_administered_date: '2026-08-14',
    next_due_date: '2026-09-11',
    days_overdue_or_remaining: -6,
    status: 'OVERDUE'
  }
];

export const INITIAL_EMAR_RECORDS: MedicationAdministrationRecord[] = [
  {
    id: 'emar-01',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    patient_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ward_id: 'ward-04',
    bed_number: 'C4-08',
    medication_name: 'Clozapine 100mg Tablet',
    dosage: '100 mg PO',
    route: 'ORAL',
    scheduled_time: '08:00',
    status: 'GIVEN',
    administered_time: '08:12',
    administered_by_staff_id: 'st-02',
    administered_by_staff_name: 'م. رئيس ممرضين كاظم عيسى',
    witness_staff_name: 'م. ثائر محمود',
    is_controlled_psychotropic: true,
    barcode: 'BC-CLZ-100-8491'
  },
  {
    id: 'emar-02',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    patient_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ward_id: 'ward-04',
    bed_number: 'C4-08',
    medication_name: 'Haloperidol Decanoate 100mg IM Depot',
    dosage: '100 mg Deep IM',
    route: 'DEPOT_IM',
    scheduled_time: '10:00',
    status: 'SCHEDULED',
    is_controlled_psychotropic: true,
    barcode: 'BC-HAL-DEPOT-0912'
  },
  {
    id: 'emar-03',
    patient_id: 'p-002',
    patient_name: 'حسين علي رضا عبد الخالق الموسوي',
    patient_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ward_id: 'ward-01',
    bed_number: 'A1-14',
    medication_name: 'Olanzapine 10mg ODT',
    dosage: '10 mg Sublingual / Oral',
    route: 'ORAL',
    scheduled_time: '08:00',
    status: 'GIVEN',
    administered_time: '08:25',
    administered_by_staff_id: 'st-03',
    administered_by_staff_name: 'م. حيدر كريم العبيدي',
    witness_staff_name: 'م. علي جاسم الموسوي',
    is_controlled_psychotropic: true,
    barcode: 'BC-OLZ-10-5501'
  },
  {
    id: 'emar-04',
    patient_id: 'p-002',
    patient_name: 'حسين علي رضا عبد الخالق الموسوي',
    patient_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ward_id: 'ward-01',
    bed_number: 'A1-14',
    medication_name: 'Diazepam 10mg IM STAT',
    dosage: '10 mg IM',
    route: 'IM',
    scheduled_time: '01:20',
    status: 'GIVEN',
    administered_time: '01:22',
    administered_by_staff_id: 'st-03',
    administered_by_staff_name: 'م. حيدر كريم العبيدي',
    witness_staff_name: 'د. صادق مهدي الساعدي',
    is_controlled_psychotropic: true,
    barcode: 'BC-DZP-10-8812'
  },
  {
    id: 'emar-05',
    patient_id: 'p-004',
    patient_name: 'سحر عبد الرزاق خضير عباس الطائي',
    patient_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ward_id: 'ward-09',
    bed_number: 'C9-04',
    medication_name: 'Quetiapine 200mg XR',
    dosage: '200 mg PO',
    route: 'ORAL',
    scheduled_time: '12:00',
    status: 'SCHEDULED',
    is_controlled_psychotropic: false,
    barcode: 'BC-QTP-200-3321'
  }
];

export const INITIAL_MEAL_MANIFESTS: MealManifest[] = [
  {
    id: 'meal-brk-w4',
    date: '2026-09-17',
    meal_type: 'BREAKFAST',
    ward_id: 'ward-04',
    ward_name: 'ردهة 4 - الطب النفسي العدلي رجال (المودعين)',
    normal_count: 98,
    diabetic_count: 24,
    low_sodium_count: 12,
    pureed_count: 5,
    total_count: 139,
    special_instructions: [
      'توزيع الملاعق البلاستيكية الآمنة حصراً ومطابقة عددها قبل وبعد الإفطار',
      'فحص حرارة شاي وحليب الإفطار (لا يتجاوز 65 مئوية لسلامة النزلاء)'
    ],
    dispatch_status: 'RECEIVED_BY_WARD',
    temperature_celsius: 68.5,
    kitchen_supervisor: 'السيد عماد عادل السامرائي (مشرف المطبخ المركزي)',
    receiving_nurse: 'م. كاظم عيسى الدراجي',
    timestamp: '07:15'
  },
  {
    id: 'meal-lun-w4',
    date: '2026-09-17',
    meal_type: 'LUNCH',
    ward_id: 'ward-04',
    ward_name: 'ردهة 4 - الطب النفسي العدلي رجال (المودعين)',
    normal_count: 98,
    diabetic_count: 24,
    low_sodium_count: 12,
    pureed_count: 5,
    total_count: 139,
    special_instructions: [
      'وجبة الغداء: أرز مع مرق فاصوليا ولحم بقري طازج مطهو جيداً',
      'الوجبات المهروسة (5) مطحونة ومعبأة بأوعية معقمة خاصة منفصلة'
    ],
    dispatch_status: 'PREPARING',
    temperature_celsius: 74.0,
    kitchen_supervisor: 'السيد عماد عادل السامرائي',
    timestamp: '11:45'
  },
  {
    id: 'meal-lun-w1',
    date: '2026-09-17',
    meal_type: 'LUNCH',
    ward_id: 'ward-01',
    ward_name: 'ردهة 1 - رجال حالات حادة',
    normal_count: 92,
    diabetic_count: 18,
    low_sodium_count: 10,
    pureed_count: 4,
    total_count: 124,
    special_instructions: [
      'ممنوع دخول عربة الطعام إلا بمرافقة ممرضين اثنين وحارس أمن داخلي',
      'عزل وجبة المريض حسين علي الموسوي (حالة عزل مؤقت)'
    ],
    dispatch_status: 'DISPATCHED',
    temperature_celsius: 76.2,
    kitchen_supervisor: 'السيد عماد عادل السامرائي',
    timestamp: '12:10'
  },
  {
    id: 'meal-lun-w7',
    date: '2026-09-17',
    meal_type: 'LUNCH',
    ward_id: 'ward-07',
    ward_name: 'ردهة 7 - نساء حالات حادة وطوارئ',
    normal_count: 88,
    diabetic_count: 19,
    low_sodium_count: 8,
    pureed_count: 4,
    total_count: 119,
    special_instructions: ['تأكيد وجبات قليلة الصوديوم لمريضات الضغط المرتفع'],
    dispatch_status: 'DISPATCHED',
    temperature_celsius: 75.0,
    kitchen_supervisor: 'السيد عماد عادل السامرائي',
    timestamp: '12:15'
  }
];

export const INITIAL_TRUST_FUND_TRANSACTIONS: TrustFundTransaction[] = [
  {
    id: 'tr-01',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    archive_number: 'RSH-1994-01842',
    type: 'PENSION_ALLOWANCE',
    amount_iqd: 250000,
    balance_after: 485000,
    date: '2026-09-01',
    requested_by: 'هيئة التقاعد الوطنية - راتب الحماية الاجتماعية',
    authorized_by: 'الأستاذ أحمد كنعان (أمين صندوق أمانات المرضى)',
    purpose: 'إيداع المنحة الشهرية المخصصة للنزيل بموجب كتاب وزارة العمل رقم 8149',
    receipt_number: 'REC-IQD-2026-9012'
  },
  {
    id: 'tr-02',
    patient_id: 'p-001',
    patient_name: 'جاسم محمد كاظم حسن العبيدي',
    archive_number: 'RSH-1994-01842',
    type: 'WITHDRAWAL',
    amount_iqd: 35000,
    balance_after: 450000,
    date: '2026-09-12',
    requested_by: 'الباحث الاجتماعي كريم عبد الحسين',
    authorized_by: 'د. عمار فاروق الجنابي',
    purpose: 'شراء ملابس داخلية قطنية ومستلزمات نظافة شخصية وشاي من كانتين المستشفى',
    receipt_number: 'REC-IQD-2026-9140'
  },
  {
    id: 'tr-03',
    patient_id: 'p-003',
    patient_name: 'كاظم شنيشل ثجيل مري العتابي',
    archive_number: 'RSH-1988-00431',
    type: 'PENSION_ALLOWANCE',
    amount_iqd: 350000,
    balance_after: 1450000,
    date: '2026-09-05',
    requested_by: 'راتب تقاعدي - مصرف الرافدين فرع الرشاد',
    authorized_by: 'الأستاذ أحمد كنعان',
    purpose: 'إيداع الراتب التقاعدي للنزيل المقيم لفترة طويلة',
    receipt_number: 'REC-IQD-2026-9055'
  }
];

export const INITIAL_PATIENT_ASSETS: PatientValuableAsset[] = [
  {
    id: 'ast-01',
    patient_id: 'p-001',
    item_name: 'هوية الأحوال المدنية + بطاقة سكن',
    description: 'المستمسكات الثبوتية الأصلية صادرة من دائرة أحوال الرصافة',
    storage_safe_box: 'Safe-B-Drawer-14',
    deposited_at: '2021-08-14',
    condition: 'سليمة داخل ظرف محكم بالشمع الأحمر'
  },
  {
    id: 'ast-02',
    patient_id: 'p-001',
    item_name: 'ساعة يد معدنية فضية + مسبحة كوك',
    description: 'ساعة يد يابانية ومسبحة سوداء خاصة بالمريض عند الإحالة من المحكمة',
    storage_safe_box: 'Safe-A-Locker-08',
    deposited_at: '2021-08-14',
    condition: 'محفوظة بحضور المفوض الأمني المرافق'
  }
];

export const INITIAL_OPD_QUEUE: OPDQueueItem[] = [
  {
    id: 'opd-01',
    ticket_number: 'OPD-01',
    patient_name: 'عمار ياسر عبد الحليم البغدادي',
    national_id: '199049102941',
    referral_source: 'POLICE_COURT',
    referral_details: 'كتاب محكمة تحقيق الرصافة رقم 4912 للفحص وإبداء الرأي في الأهلية العقلية',
    triage_level: 'EMERGENCY_RED',
    arrival_time: '08:10',
    estimated_wait_minutes: 5,
    status: 'IN_CONSULTATION',
    assigned_doctor: 'د. صادق مهدي الساعدي'
  },
  {
    id: 'opd-02',
    ticket_number: 'OPD-02',
    patient_name: 'سناء خضير مطشر الربيعي',
    national_id: '198420194812',
    referral_source: 'FAMILY_WALKIN',
    referral_details: 'نوبات صراخ وبكاء شديد، امتناع عن الطعام 4 أيام مع وساوس تشكك بالطعام',
    triage_level: 'URGENT_YELLOW',
    arrival_time: '08:35',
    estimated_wait_minutes: 15,
    status: 'WAITING',
    assigned_doctor: 'د. ميسون إبراهيم القيسي'
  },
  {
    id: 'opd-03',
    ticket_number: 'OPD-03',
    patient_name: 'وليد خالد صبري السعدون',
    national_id: '197940192841',
    referral_source: 'FAMILY_WALKIN',
    referral_details: 'مراجعة دورية لصرف أدوية الفصام الشهرية ومتابعة الأعراض الجانبية',
    triage_level: 'ROUTINE_GREEN',
    arrival_time: '08:50',
    estimated_wait_minutes: 25,
    status: 'WAITING',
    assigned_doctor: 'د. وسام قاسم الخفاجي'
  },
  {
    id: 'opd-04',
    ticket_number: 'OPD-04',
    patient_name: 'محمد باقر جابر الحسيني',
    national_id: '200148102941',
    referral_source: 'GENERAL_HOSPITAL',
    referral_details: 'إحالة من طوارئ مستشفى الكندي العام بعد استقرار حالة التسمم الدوائي المشتبه بانتحار',
    triage_level: 'EMERGENCY_RED',
    arrival_time: '09:05',
    estimated_wait_minutes: 10,
    status: 'WAITING',
    assigned_doctor: 'د. عمار فاروق الجنابي'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-01',
    name: 'Dr. Ammar Farooq Al-Janabi',
    arabic_name: 'د. عمار فاروق الجنابي',
    role: 'CONSULTANT_PSYCHIATRIST',
    role_title_ar: 'استشاري الطب النفسي ورئيس اللجان الطبية العدلية',
    department: 'قسم الطب النفسي العدلي والسريري',
    assigned_ward: 'ward-04',
    shift: 'MORNING',
    phone: '07701429810',
    license_number: 'DOC-IRQ-PSY-1994'
  },
  {
    id: 'st-02',
    name: 'Kadhim Issa Al-Darraji',
    arabic_name: 'م. رئيس ممرضين كاظم عيسى الدراجي',
    role: 'WARD_HEAD_NURSE',
    role_title_ar: 'رئيس تمريض الردهة العدلية الرابعة',
    department: 'دائرة التمريض والرعاية السريرية',
    assigned_ward: 'ward-04',
    shift: 'MORNING',
    phone: '07802914821',
    license_number: 'NUR-IRQ-2005-41'
  },
  {
    id: 'st-03',
    name: 'Haider Kareem Al-Obeidi',
    arabic_name: 'م. أقدم حيدر كريم العبيدي',
    role: 'WARD_HEAD_NURSE',
    role_title_ar: 'مسؤول تمريض ردهة 1 حادة',
    department: 'دائرة التمريض',
    assigned_ward: 'ward-01',
    shift: 'MORNING',
    phone: '07718291042',
    license_number: 'NUR-IRQ-2010-88'
  },
  {
    id: 'st-04',
    name: 'Emad Adel Al-Samarrai',
    arabic_name: 'السيد عماد عادل السامرائي',
    role: 'KITCHEN_SUPERVISOR',
    role_title_ar: 'مشرف الإعاشة والمطبخ المركزي (6,000 وجبة يومياً)',
    department: 'شعبة التغذية والإعاشة الفندقية',
    assigned_ward: 'central-kitchen',
    shift: 'MORNING',
    phone: '07901849102',
    license_number: 'ADM-NUT-1998'
  },
  {
    id: 'st-05',
    name: 'Kareem Abdul Hussein',
    arabic_name: 'الباحث الاجتماعي كريم عبد الحسين',
    role: 'SOCIAL_WORKER',
    role_title_ar: 'باحث اجتماعي أقدم ومسؤول أمانات المرضى والتأهيل',
    department: 'شعبة الخدمة الاجتماعية والتأهيل',
    assigned_ward: 'ward-04',
    shift: 'MORNING',
    phone: '07739102941',
    license_number: 'SOC-IRQ-2002'
  },
  {
    id: 'st-06',
    name: 'Maysoun Ibrahim Al-Qaisi',
    arabic_name: 'د. ميسون إبراهيم القيسي',
    role: 'CONSULTANT_PSYCHIATRIST',
    role_title_ar: 'استشارية الطب النفسي النسائي ورئيسة ردهات النساء',
    department: 'قسم الطب النفسي العام',
    assigned_ward: 'ward-07',
    shift: 'MORNING',
    phone: '07709124810',
    license_number: 'DOC-IRQ-PSY-1999'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-09-17 08:12:44',
    user_id: 'st-02',
    user_name: 'كاظم عيسى الدراجي',
    role: 'WARD_HEAD_NURSE',
    action: 'MEDICATION_ADMINISTRATION_GIVEN',
    action_ar: 'صرف وتوثيق دواء مؤثر عقلي خاضع للرقابة',
    target_resource: 'Patient: p-001 (جاسم محمد كاظم) - Clozapine 100mg',
    details: 'تم مسح الباركود BC-CLZ-100-8491 وتوثيق إعطاء الجرعة بحضور الشاهد التمريضي',
    terminal_id: 'TERMINAL-WARD04-TAB02',
    hash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'log-02',
    timestamp: '2026-09-17 07:20:15',
    user_id: 'st-04',
    user_name: 'عماد عادل السامرائي',
    role: 'KITCHEN_SUPERVISOR',
    action: 'MEAL_CART_DISPATCHED',
    action_ar: 'إرسال عربة طعام الإفطار للردهة الرابعة العدلية',
    target_resource: 'MealManifest: meal-brk-w4 (139 وجبة مطابقة للحميات)',
    details: 'فحص درجة الحرارة 68.5 مئوية وتسليم المانيفست لمسؤول التمريض',
    terminal_id: 'TERMINAL-KITCHEN-MAIN',
    hash: 'SHA256:88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589'
  },
  {
    id: 'log-03',
    timestamp: '2026-09-17 01:16:02',
    user_id: 'st-01',
    user_name: 'د. صادق مهدي الساعدي',
    role: 'CONSULTANT_PSYCHIATRIST',
    action: 'SECLUSION_ROOM_ORDER_CREATED',
    action_ar: 'إصدار أمر عزل طارئ في غرفة الأمان',
    target_resource: 'Patient: p-002 (حسين علي رضا) - Seclusion Room A1',
    details: 'بسبب الهياج الحاد وكسر زجاج الردهة، مع تفعيل جدول الفحص التمريضي كل 15 دقيقة',
    terminal_id: 'TERMINAL-WARD01-DR01',
    hash: 'SHA256:9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7'
  }
];

// FAST 65,000 ARCHIVE ENGINE GENERATOR
// Pre-generates or simulates indexed search across 65,000 historical files in Al-Rashad Hospital
export interface ArchiveRecord {
  archive_number: string;
  national_id: string;
  full_name: string;
  mother_name: string;
  admission_year: number;
  discharge_year?: number;
  status: 'INPATIENT' | 'DISCHARGED' | 'DECEASED' | 'ESCAPED' | 'OUTPATIENT';
  diagnosis: string;
  judicial_case_no?: string;
  ward?: string;
}

const FIRST_NAMES = ['علي', 'محمد', 'حسين', 'كاظم', 'جاسم', 'حيدر', 'مهدي', 'صادق', 'عبد الله', 'حسن', 'فاضل', 'عمار', 'ضياء', 'شاكر', 'وسام', 'زينب', 'فاطمة', 'سحر', 'مريم', 'هدى', 'رجاء', 'سوسن', 'إخلاص', 'نادية'];
const SECOND_NAMES = ['جاسم', 'محمد', 'علي', 'كريم', 'صالح', 'جواد', 'عبد الأمير', 'رزاق', 'مهدي', 'حامد', 'قاسم', 'هادي', 'لطيف', 'جعفر', 'حميد'];
const THIRD_NAMES = ['كاظم', 'حسين', 'إبراهيم', 'خضير', 'عيسى', 'رحيم', 'سلمان', 'منعم', 'شنيشل', 'محمود', 'شاكر', 'فرحان'];
const TRIBAL_NAMES = ['الساعدي', 'العبيدي', 'الموسوي', 'الشمري', 'الزبيدي', 'اللامي', 'الدراجي', 'الخفاجي', 'البديري', 'العتابي', 'الطائي', 'الحمداني', 'الكرخي', 'الكناني', 'الخيكاني', 'التميمي', 'الجبوري', 'العامري'];
const MOTHER_NAMES = ['فاطمة جواد', 'زينب هادي', 'حمدية صخي', 'رجاء سلمان', 'صبيحة كاظم', 'منى حامد', 'أزهار لطيف', 'بتول نعيم', 'سهام عبد', 'نضال كريم'];
const DIAGNOSES = [
  'الفصام البارانويدي المزمن (F20.0)',
  'الاضطراب الوجداني ثنائي القطب، نوبة هوس حاد (F31.1)',
  'الفصام الوجداني الشيزوعاطفي (F25.0)',
  'الفصام الكتاتوني التخشبي (F20.2)',
  'الذهان المستحث بمواد التعاطي والمؤثرات (F19.5)',
  'خرف الشيخوخة الوعائي مع مظاهر ذهانية (F01)',
  'التخلف العقلي الشديد مع اضطرابات سلوكية عنيفة (F72)',
  'الاضطراب الاكتئابي الجسيم مع ضلالات عدمية (F32.3)'
];

// In-memory index of archive records
let GENERATED_ARCHIVE_CACHE: ArchiveRecord[] | null = null;

export function getOrGenerateArchiveIndex(): ArchiveRecord[] {
  if (GENERATED_ARCHIVE_CACHE) {
    return GENERATED_ARCHIVE_CACHE;
  }

  const records: ArchiveRecord[] = [];
  
  // Seed with real initial inpatient records first
  INITIAL_PATIENTS.forEach((p, idx) => {
    records.push({
      archive_number: p.archive_number,
      national_id: p.national_id || `197${idx}8491029`,
      full_name: p.full_name,
      mother_name: p.mother_name,
      admission_year: parseInt(p.admission_date.split('-')[0]),
      status: p.current_status,
      diagnosis: p.primary_diagnosis,
      judicial_case_no: p.court_case_number,
      ward: p.ward_id
    });
  });

  // Deterministically generate 2,500 active index records + mock counter for 65,000 files
  for (let i = 1; i <= 2500; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const sn = SECOND_NAMES[(i * 3) % SECOND_NAMES.length];
    const tn = THIRD_NAMES[(i * 7) % THIRD_NAMES.length];
    const tr = TRIBAL_NAMES[(i * 11) % TRIBAL_NAMES.length];
    const mn = MOTHER_NAMES[i % MOTHER_NAMES.length];
    const diag = DIAGNOSES[i % DIAGNOSES.length];
    
    const year = 1965 + (i % 60);
    const seq = String(i).padStart(5, '0');
    const archiveNo = `RSH-${year}-${seq}`;
    const nationalId = `${year}${String((i * 13) % 90000000 + 10000000)}`;
    
    const statusRand = i % 10;
    const status: ArchiveRecord['status'] = 
      statusRand < 3 ? 'INPATIENT' :
      statusRand < 6 ? 'DISCHARGED' :
      statusRand < 8 ? 'DECEASED' :
      statusRand === 8 ? 'OUTPATIENT' : 'ESCAPED';

    records.push({
      archive_number: archiveNo,
      national_id: nationalId,
      full_name: `${fn} ${sn} ${tn} ${tr}`,
      mother_name: mn,
      admission_year: year,
      discharge_year: status === 'DISCHARGED' || status === 'DECEASED' ? year + (i % 15) : undefined,
      status,
      diagnosis: diag,
      judicial_case_no: i % 4 === 0 ? `${(i * 17) % 3000 + 100}/جنايات/${year}` : undefined,
      ward: status === 'INPATIENT' ? `ward-0${(i % 12) + 1}` : undefined
    });
  }

  GENERATED_ARCHIVE_CACHE = records;
  return records;
}

// Sub-50ms Indexed Search implementation
export function searchArchiveSub50ms(query: string, filterStatus?: string): { results: ArchiveRecord[]; durationMs: number; totalScanned: number } {
  const startTime = performance.now();
  const allRecords = getOrGenerateArchiveIndex();
  const cleanQ = query.trim().toLowerCase();

  if (!cleanQ && !filterStatus) {
    const elapsed = performance.now() - startTime;
    return {
      results: allRecords.slice(0, 30),
      durationMs: Math.max(1, Math.round(elapsed)),
      totalScanned: 65420
    };
  }

  const matches: ArchiveRecord[] = [];
  
  for (let i = 0; i < allRecords.length; i++) {
    const r = allRecords[i];
    if (filterStatus && filterStatus !== 'ALL' && r.status !== filterStatus) {
      continue;
    }

    if (!cleanQ) {
      matches.push(r);
      if (matches.length >= 50) break;
      continue;
    }

    // Fast multi-field matching
    if (
      r.full_name.includes(cleanQ) ||
      r.archive_number.toLowerCase().includes(cleanQ) ||
      r.national_id.includes(cleanQ) ||
      r.mother_name.includes(cleanQ) ||
      (r.judicial_case_no && r.judicial_case_no.includes(cleanQ)) ||
      r.diagnosis.includes(cleanQ)
    ) {
      matches.push(r);
      if (matches.length >= 50) break;
    }
  }

  const elapsed = performance.now() - startTime;
  return {
    results: matches,
    durationMs: Math.max(2, Math.round(elapsed * 10) / 10),
    totalScanned: 65420
  };
}
