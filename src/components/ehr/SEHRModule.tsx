import React, { useState } from 'react';
import { 
  FileHeart, 
  Search, 
  User, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Activity, 
  HeartHandshake, 
  Save, 
  Printer,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Patient, MentalStatusExam, Nursing15MinCheck } from '../../types';

export const SEHRModule: React.FC = () => {
  const { 
    patients, 
    selectedPatientId, 
    setSelectedPatientId, 
    mseRecords, 
    saveMSE, 
    restraintLogs, 
    add15MinRestraintCheck,
    openPrintDocument,
    openBarcodeScanner,
    updatePatientDietary
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MSE' | 'RESTRAINT_15MIN' | 'DSM5_DIAGNOSIS' | 'SOCIAL_WORK'>('OVERVIEW');
  const [patientSearch, setPatientSearch] = useState('');
  const [filterWard, setFilterWard] = useState<string>('ALL');

  // Selected Patient
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const activeMse = mseRecords[activePatient.id] || {
    id: `mse-${activePatient.id}`,
    patient_id: activePatient.id,
    assessment_date: new Date().toISOString().split('T')[0],
    examiner_name: 'د. عمار فاروق الجنابي (استشاري)',
    appearance_grooming: 'هيئة مقبولة، ارتداء ملابس الردهة بانتظام، تواصل بصري متحفظ.',
    behavior_psychomotor: 'تململ حركي، بطء نسبي في الاستجابة للأوامر البسيطة.',
    speech_characteristics: 'كلام بطيء، نبرة منخفضة، ترابط جمل سليم عموماً.',
    mood_subjective: 'يصف مزاجه بأنه مستقر نسبياً مع قلق من المستقبل.',
    affect_objective: 'تبلد وجداني خفيف (Mild Blunting).',
    thought_process: 'تفكير خطي متماسك مع توقفات طفيفة.',
    thought_content: 'لا ضلالات انتحارية حادة في الوقت الراهن، وساوس جزئية.',
    perception: 'لا هلاوس سمعية مباشرة في المقابلة الحالية.',
    cognition_orientation: 'مدرك للزمان والمكان والبيئة المحيطة (Oriented x3).',
    insight_judgment_grade: 2,
    clinical_summary: 'فصام مزمن مستقر على العلاج الدوائي الممتد، استبصار جزئي (الدرجة 2)، متابعة دورية.'
  };

  // MSE Form State
  const [mseForm, setMseForm] = useState<MentalStatusExam>(activeMse);
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  // 15-Minute Observation Form State
  const activeRestraint = restraintLogs.find(r => r.patient_id === activePatient.id && r.active);
  const [obsVitalSigns, setObsVitalSigns] = useState('ضغط: 135/85 | نبض: 88 | SpO2: 98%');
  const [obsHydration, setObsHydration] = useState(true);
  const [obsRangeOfMotion, setObsRangeOfMotion] = useState(false);
  const [obsBehavior, setObsBehavior] = useState('هدوء نسبي، يتحدث بصوت منخفض، مستلقٍ على السرير دون مقاومة.');

  // Filtering patients
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.full_name.includes(patientSearch) || 
                          p.archive_number.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          p.mother_name.includes(patientSearch);
    const matchesWard = filterWard === 'ALL' || p.ward_id === filterWard;
    return matchesSearch && matchesWard;
  });

  const handleSaveMse = () => {
    saveMSE(mseForm);
    setIsSavedBanner(true);
    setTimeout(() => setIsSavedBanner(false), 3000);
  };

  const handleAdd15MinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRestraint) return;

    const newCheck: Nursing15MinCheck = {
      id: `check-${Date.now()}`,
      time: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      vital_signs: obsVitalSigns,
      patient_behavior: obsBehavior,
      hydration_nutrition_offered: obsHydration,
      range_of_motion_done: obsRangeOfMotion,
      nurse_name: 'ممرض جامعي حيدر مهدي'
    };

    add15MinRestraintCheck(activeRestraint.id, newCheck);
    setObsBehavior('المريض مستقر، تحت الملاحظة المستمرة.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              سجلات المرضى الراقدين
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              الملف الطبي السريري
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            متابعة السيرة المرضية، فحص الحالة العقلية، الحميات الغذائية، وملاحظات التمريض.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openPrintDocument({
              type: 'FORENSIC_REPORT',
              title: `تقرير الحالة السريرية — ${activePatient.full_name}`,
              data: activePatient
            })}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>طباعة الإضبارة</span>
          </button>
          <button
            onClick={() => openBarcodeScanner((code) => {
              const matched = patients.find(p => p.id === code || p.archive_number === code);
              if (matched) setSelectedPatientId(matched.id);
            })}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>مسح معصم المريض</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Patient Selector + Clinical Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 Cols): Patients Census List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="بحث بالاسم، رقم الأرشيف، أو اسم الأم..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Ward Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 shrink-0 font-medium">الردهة:</span>
              <select
                value={filterWard}
                onChange={(e) => setFilterWard(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-2.5 py-1.5 outline-none text-xs"
              >
                <option value="ALL">جميع الردهات (1,500 نزيل)</option>
                <option value="ward-01">ردهة 1 - رجال حادة</option>
                <option value="ward-04">ردهة 4 - الطب النفسي العدلي (المودعين)</option>
                <option value="ward-07">ردهة 7 - نساء حادة</option>
                <option value="ward-10">ردهة 10 - طب نفسي المسنين</option>
                <option value="ward-11">ردهة 11 - علاج إدمان ومزدوجي التشخيص</option>
              </select>
            </div>

            {/* Patients List */}
            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-0.5">
              {filteredPatients.map((p) => {
                const isSelected = p.id === activePatient.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      if (mseRecords[p.id]) setMseForm(mseRecords[p.id]);
                    }}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={p.photo_url} 
                        alt={p.full_name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" 
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs text-slate-900 truncate">{p.full_name}</h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-mono text-blue-700 font-medium">{p.archive_number}</span>
                          <span>• سرير: {p.bed_number}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">الأم: {p.mother_name}</p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded block ${
                        p.risk_level === 'EXTREME' || p.risk_level === 'HIGH'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.risk_level === 'EXTREME' ? 'خطورة قصوى' : p.risk_level === 'HIGH' ? 'ملاحظة خاصة' : 'مستقر'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {p.admission_type === 'FORENSIC' ? 'إيداع عدلي' : 'دخول اعتيادي'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (8 Cols): Comprehensive Psychiatric Record Details */}
        <div className="lg:col-span-8 space-y-4">
          {/* Patient Header Card */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={activePatient.photo_url} 
                alt="" 
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-2xs" 
              />

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base text-slate-900">
                    {activePatient.full_name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-700 border border-slate-200">
                    {activePatient.archive_number}
                  </span>
                  {activePatient.admission_type === 'FORENSIC' && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      إيداع قضائي (مادة 78 عقوبات)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                  <div>اسم الأم: <strong className="text-slate-800">{activePatient.mother_name}</strong></div>
                  <div>الردهة: <strong className="text-slate-800">{activePatient.ward_id}</strong></div>
                  <div>رقم السرير: <strong className="text-slate-800 font-mono">{activePatient.bed_number}</strong></div>
                  <div>العمر: <strong className="text-slate-800 font-mono">{activePatient.age} سنة</strong></div>
                </div>
              </div>
            </div>

            {/* Quick Balance & Dietary */}
            <div className="flex md:flex-col items-end gap-2 text-left shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500 block text-[10px]">رصيد أمانات النزيل:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {activePatient.trust_fund_balance.toLocaleString()} د.ع
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500 block text-[10px]">نوع الوجبة:</span>
                <span className="font-semibold text-blue-700">
                  {activePatient.dietary_type}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'OVERVIEW'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              الملخص السريري
            </button>
            <button
              onClick={() => setActiveTab('MSE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'MSE'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              فحص الحالة العقلية (MSE)
            </button>
            <button
              onClick={() => setActiveTab('RESTRAINT_15MIN')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'RESTRAINT_15MIN'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>سجل الملاحظة (15 دقيقة)</span>
              {activeRestraint && (
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('DSM5_DIAGNOSIS')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'DSM5_DIAGNOSIS'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              التشخيص DSM-5 / ICD-11
            </button>
            <button
              onClick={() => setActiveTab('SOCIAL_WORK')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'SOCIAL_WORK'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              البحث الاجتماعي والزيارات
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3 shadow-2xs">
                <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>التشخيص الأولي والمسار السريري</span>
                </h4>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-800 font-medium">
                  {activePatient.primary_diagnosis}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">كود التصنيف الدولي:</span>
                    <strong className="text-slate-800 font-mono">ICD-11: {activePatient.icd11_code}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">الدليل التشخيصي:</span>
                    <strong className="text-slate-800 font-mono">DSM-5: {activePatient.dsm5_code}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">تاريخ الدخول:</span>
                    <strong className="text-slate-800 font-mono">{activePatient.admission_date}</strong>
                  </div>
                </div>

                {/* Dietary Configuration */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">الحمية الغذائية السريرية:</span>
                    <span className="text-[11px] text-slate-500">تحديث فوري لمانيفست المطبخ</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['NORMAL', 'DIABETIC', 'LOW_SODIUM', 'PUREED'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => updatePatientDietary(activePatient.id, d)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                          activePatient.dietary_type === d
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {d === 'NORMAL' ? 'طعام اعتيادي' :
                         d === 'DIABETIC' ? 'حمية سكري' :
                         d === 'LOW_SODIUM' ? 'قليل الصوديوم' : 'طعام مهروس'}
                      </button>
                    ))}
                  </div>
                  {activePatient.dietary_notes && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      ملاحظة الحمية: {activePatient.dietary_notes}
                    </p>
                  )}
                </div>

                {/* Allergy warning */}
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-rose-900">التحسس الدوائي والغذائي:</span>
                    <p className="text-rose-800 mt-0.5">
                      {activePatient.allergies.length > 0 
                        ? activePatient.allergies.join(' | ') 
                        : 'لا يوجد تحسس دوائي أو غذائي مسجل'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE MSE BUILDER */}
          {activeTab === 'MSE' && (
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>فحص الحالة العقلية والنفسية (Mental Status Examination)</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    تقييم الأبعاد السريرية وتحديد درجة الاستبصار والحكم العقلي (1 - 6)
                  </p>
                </div>
                <button
                  onClick={handleSaveMse}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>حفظ الفحص</span>
                </button>
              </div>

              {isSavedBanner && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم حفظ وتحديث فحص الحالة العقلية في إضبارة المريض بنجاح.</span>
                </div>
              )}

              {/* MSE 9 Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Appearance & Grooming */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">1. المظهر العام والهيئة:</label>
                  <textarea
                    rows={2}
                    value={mseForm.appearance_grooming}
                    onChange={(e) => setMseForm({ ...mseForm, appearance_grooming: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 2. Behavior & Psychomotor */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">2. السلوك والنشاط الحركي:</label>
                  <textarea
                    rows={2}
                    value={mseForm.behavior_psychomotor}
                    onChange={(e) => setMseForm({ ...mseForm, behavior_psychomotor: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 3. Speech */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">3. خصائص الكلام والنطق:</label>
                  <textarea
                    rows={2}
                    value={mseForm.speech_characteristics}
                    onChange={(e) => setMseForm({ ...mseForm, speech_characteristics: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 4. Mood & Affect */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">4. المزاج والوجدان الظاهر:</label>
                  <textarea
                    rows={2}
                    value={mseForm.mood_subjective}
                    onChange={(e) => setMseForm({ ...mseForm, mood_subjective: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 5. Thought Process */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">5. مسار وترابط التفكير:</label>
                  <textarea
                    rows={2}
                    value={mseForm.thought_process}
                    onChange={(e) => setMseForm({ ...mseForm, thought_process: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 6. Thought Content */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">6. محتوى التفكير والضلالات:</label>
                  <textarea
                    rows={2}
                    value={mseForm.thought_content}
                    onChange={(e) => setMseForm({ ...mseForm, thought_content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 7. Perception */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">7. الإدراك الحسي والهلاوس:</label>
                  <textarea
                    rows={2}
                    value={mseForm.perception}
                    onChange={(e) => setMseForm({ ...mseForm, perception: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>

                {/* 8. Cognition & Orientation */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">8. التوجه الإدراكي والذاكرة:</label>
                  <textarea
                    rows={2}
                    value={mseForm.cognition_orientation}
                    onChange={(e) => setMseForm({ ...mseForm, cognition_orientation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                  />
                </div>
              </div>

              {/* 9. Insight & Judgment Grade Builder */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-xs text-slate-800">
                    9. مقياس درجات الاستبصار والحكم العقلي (من 1 إلى 6):
                  </label>
                  <span className="font-bold font-mono text-blue-700 text-sm">
                    الدرجة: {mseForm.insight_judgment_grade} من 6
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={mseForm.insight_judgment_grade}
                  onChange={(e) => setMseForm({ ...mseForm, insight_judgment_grade: parseInt(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>1: إنكار المرض</span>
                  <span>2: وعي طفيف</span>
                  <span>3: لوم الظروف</span>
                  <span>4: وعي دون سبب</span>
                  <span>5: استبصار فكري</span>
                  <span>6: استبصار حقيقي</span>
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="space-y-1">
                <label className="font-semibold text-xs text-slate-800 block">
                  الخلاصة السريرية وتوصية الطبيب المعالج:
                </label>
                <textarea
                  rows={3}
                  value={mseForm.clinical_summary}
                  onChange={(e) => setMseForm({ ...mseForm, clinical_summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 outline-none focus:border-blue-500 focus:bg-white text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: RESTRAINT & 15-MINUTE OBSERVATION MATRIX */}
          {activeTab === 'RESTRAINT_15MIN' && (
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>سجل الملاحظة التمريضية الدورية (كل 15 دقيقة)</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    تدقيق تمريضي دوري يشمل العلامات الحيوية، تقديم السوائل، ودرجة الاستقرار.
                  </p>
                </div>

                {activeRestraint && (
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold">
                    المريض تحت الملاحظة حالياً
                  </span>
                )}
              </div>

              {activeRestraint ? (
                <div className="space-y-4">
                  {/* Active Restraint Details Card */}
                  <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-lg space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-rose-900">أمر الملاحظة المشددة:</span>
                      <span className="font-mono text-slate-500">{activeRestraint.start_time}</span>
                    </div>
                    <p className="text-slate-700">
                      <strong>الطبيب المسؤول:</strong> {activeRestraint.authorized_by_doctor}
                    </p>
                    <p className="text-slate-700">
                      <strong>السبب السريري:</strong> {activeRestraint.authorization_reason}
                    </p>
                  </div>

                  {/* Add New 15-Min Check Form */}
                  <form onSubmit={handleAdd15MinCheck} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                    <span className="font-semibold text-xs text-slate-800 block">
                      تسجيل فحص دوري جديد:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-600 block mb-1">العلامات الحيوية (Vital Signs):</label>
                        <input
                          type="text"
                          value={obsVitalSigns}
                          onChange={(e) => setObsVitalSigns(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 font-mono text-xs"
                        />
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={obsHydration}
                            onChange={(e) => setObsHydration(e.target.checked)}
                            className="rounded accent-blue-600"
                          />
                          <span>تقديم ماء/سوائل</span>
                        </label>
                        <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={obsRangeOfMotion}
                            onChange={(e) => setObsRangeOfMotion(e.target.checked)}
                            className="rounded accent-blue-600"
                          />
                          <span>تحريك الأطراف</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1 text-xs">حالة المريض واستجابته:</label>
                      <input
                        type="text"
                        value={obsBehavior}
                        onChange={(e) => setObsBehavior(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      توثيق الفحص في السجل
                    </button>
                  </form>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <span className="font-semibold text-xs text-slate-700 block">
                      سجل الفحوصات الموثقة ({activeRestraint.fifteen_min_checks.length} فحوصات):
                    </span>
                    <div className="space-y-2">
                      {activeRestraint.fifteen_min_checks.map((chk) => (
                        <div key={chk.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 font-semibold text-slate-800">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              <span className="font-mono text-blue-700">{chk.time}</span>
                              <span>— التمريض: {chk.nurse_name}</span>
                            </div>
                            <p className="text-slate-600 mt-1 font-mono text-[11px]">{chk.vital_signs}</p>
                            <p className="text-slate-700 mt-0.5">{chk.patient_behavior}</p>
                          </div>
                          <div className="text-left text-[11px] text-slate-500 shrink-0">
                            {chk.hydration_nutrition_offered ? (
                              <span className="text-emerald-700 font-medium block">سوائل: قُدمت</span>
                            ) : (
                              <span className="text-slate-400 block">سوائل: رُفضت</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-slate-800">المريض بحالة مستقرة</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    لا يتطلب إجراءات ملاحظة استثنائية أو تقييد في الوقت الحالي.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DSM-5 & ICD-11 */}
          {activeTab === 'DSM5_DIAGNOSIS' && (
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-4 text-xs shadow-2xs">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>التشخيص الطبي والتصنيف السريري</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="font-semibold text-blue-700 block">المحور الأول: الاضطراب النفسي الرئيسي</span>
                  <div className="p-2.5 bg-white rounded border border-slate-200 font-semibold text-slate-900">
                    {activePatient.primary_diagnosis}
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    رمز ICD-11: {activePatient.icd11_code} | رمز DSM-5: {activePatient.dsm5_code}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <span className="font-semibold text-slate-700 block">المحور الثاني: الحالات المرافقة والأمراض الجسدية</span>
                  <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-700">
                    {activePatient.secondary_diagnosis || 'لا توجد أمراض جسدية مزمنة مسجلة'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-800 block">المستوى الوظيفي والتقييم النفسي الاجتماعي:</span>
                <p className="text-slate-600 leading-relaxed">
                  مقياس الأداء الوظيفي (GAF): <strong>25 / 100</strong> (عجز وظيفي يتطلب إشرافاً تمريضياً ورعاية دورية داخل الردهة).
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: SOCIAL WORK & REHAB */}
          {activeTab === 'SOCIAL_WORK' && (
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-4 text-xs shadow-2xs">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                <span>شعبة البحث الاجتماعي والزيارات</span>
              </h4>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">تقرير الباحث الاجتماعي:</span>
                  <span className="text-slate-400 font-mono text-[11px]">تاريخ التقييم: 2026-09-02</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  المريض مقيم لفترة طويلة، يتلقى زيارات عائلية دورية من شقيقه. يشارك في برامج التأهيل الحركي ورعاية الحدائق العلاجية مع تحسن ملحوظ في التفاعل الاجتماعي.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-800 block">تصاريح الزيارات العائلية المعتمدة:</span>
                <div className="p-2.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">كاظم محمد حسن</span>
                    <span className="text-slate-500 block text-[11px]">القرابة: أخ شقيق — هوية: 197029104</span>
                  </div>
                  <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                    مصرح له بالزيارة
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
