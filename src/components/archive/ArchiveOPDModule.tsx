import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle,
  FileQuestion,
  RefreshCw
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { useArchiveSearch } from '../../hooks/useArchiveSearch';
import { Patient } from '../../types';

export const ArchiveOPDModule: React.FC = () => {
  const { 
    opdQueue, 
    wards, 
    admitPatientToWard, 
    setSelectedPatientId, 
    setActiveDomain 
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'ARCHIVE_SEARCH' | 'OPD_TRIAGE'>('ARCHIVE_SEARCH');

  const {
    query: archiveQuery,
    setQuery: setArchiveQuery,
    status: searchStatus,
    results: searchResults,
    executionTimeMs,
    errorMessage,
    totalRecordsSearched,
    refresh: refreshSearch
  } = useArchiveSearch('جاسم');

  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [candidateForAdmission, setCandidateForAdmission] = useState<Partial<Patient> | null>(null);
  const [selectedWardId, setSelectedWardId] = useState<string>(wards[0]?.id || 'ward-01');
  const [selectedBedNumber, setSelectedBedNumber] = useState<string>('B1-09');
  const [admissionDiet, setAdmissionDiet] = useState<'NORMAL' | 'DIABETIC' | 'LOW_SODIUM' | 'PUREED'>('NORMAL');
  const [admissionType, setAdmissionType] = useState<'VOLUNTARY' | 'INVOLUNTARY_CIVIL' | 'FORENSIC'>('INVOLUNTARY_CIVIL');
  const [admissionSuccess, setAdmissionSuccess] = useState(false);

  const openAdmissionModal = (candidate: Partial<Patient>) => {
    setCandidateForAdmission(candidate);
    setIsAdmissionOpen(true);
    setAdmissionSuccess(false);
  };

  const handleConfirmAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateForAdmission || !candidateForAdmission.full_name) return;

    admitPatientToWard({
      full_name: candidateForAdmission.full_name,
      mother_name: candidateForAdmission.mother_name || 'غير مدون',
      ward_id: selectedWardId,
      bed_number: selectedBedNumber,
      dietary_type: admissionDiet,
      admission_type: admissionType,
      primary_diagnosis: candidateForAdmission.primary_diagnosis || 'ذهان حاد قيد التقييم والاستقرار السريري',
      risk_level: 'HIGH'
    });

    setAdmissionSuccess(true);
    setTimeout(() => {
      setIsAdmissionOpen(false);
      setAdmissionSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              الأرشيف الصحي والعيادة الاستشارية الخارجية
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              إدارة الإضبارات والمراجعين
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            البحث في سجلات المرضى والمودعين، فرز حالات الاستشارية، وإجراءات الدخول للردهات.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span>إجمالي الملفات المفهرسة: <strong className="font-mono text-slate-800">65,420</strong> ملف</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('ARCHIVE_SEARCH')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'ARCHIVE_SEARCH'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>البحث في الأرشيف الطبي</span>
        </button>
        <button
          onClick={() => setActiveTab('OPD_TRIAGE')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'OPD_TRIAGE'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>مراجعو الاستشارية اليوم ({opdQueue.length} مراجع)</span>
        </button>
      </div>

      {activeTab === 'ARCHIVE_SEARCH' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  value={archiveQuery}
                  onChange={(e) => setArchiveQuery(e.target.value)}
                  placeholder="ابحث بالاسم الكامل، اسم الأم، رقم الإضبارة الأرشيفية (RSH-...)، أو رقم الدعوى..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-10 pl-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
              {archiveQuery && (
                <button
                  type="button"
                  onClick={() => setArchiveQuery('')}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs border border-slate-200 transition-colors"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <div className="flex items-center gap-2">
                <span>نتائج البحث:</span>
                <span className="font-semibold text-slate-800">{searchResults.length} ملف</span>
                {executionTimeMs > 0 && (
                  <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {executionTimeMs}ms عبر {totalRecordsSearched.toLocaleString()} سجل
                  </span>
                )}
              </div>
              {searchStatus === 'loading' && (
                <span className="flex items-center gap-1 text-blue-600 text-[11px]">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>جاري البحث في الفهرس...</span>
                </span>
              )}
            </div>

            {searchStatus === 'loading' && searchResults.length === 0 && (
              <div className="p-12 text-center bg-white border border-slate-200 rounded-xl">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600 font-medium">جاري فحص وتصفية سجلات الأرشيف...</p>
              </div>
            )}

            {searchStatus === 'error' && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage || 'حدث خطأ أثناء الاتصال بنظام الأرشيف'}</span>
                </div>
                <button
                  onClick={refreshSearch}
                  className="px-3 py-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-900 font-medium"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            {searchStatus === 'empty' && (
              <div className="p-10 text-center bg-white border border-slate-200 rounded-xl space-y-2">
                <FileQuestion className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">لا توجد سجلات مطابقة</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  لم يتم العثور على أية إضبارة تطابق عبارة البحث "{archiveQuery}". يرجى التحقق من صحة الاسم الرباعي أو رقم السجل.
                </p>
                <button
                  onClick={() => setArchiveQuery('')}
                  className="mt-2 px-3.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors inline-block"
                >
                  عرض كافة السجلات
                </button>
              </div>
            )}

            {(searchStatus === 'success' || searchResults.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all space-y-3 text-xs shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={patient.photo_url} 
                          alt="" 
                          className="w-11 h-11 rounded-lg object-cover border border-slate-200" 
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-slate-900">{patient.full_name}</h4>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            اسم الأم: <strong className="text-slate-700">{patient.mother_name}</strong> | العمر: {patient.age} سنة
                          </div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium text-[11px] border border-slate-200">
                        {patient.archive_number}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="text-slate-700 line-clamp-2">
                        التشخيص: {patient.primary_diagnosis}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                        <span>الردهة: {patient.ward_id} (سرير {patient.bed_number})</span>
                        <span>الدخول: {patient.admission_date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setSelectedPatientId(patient.id);
                          setActiveDomain('SEHR');
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-center transition-colors cursor-pointer"
                      >
                        عرض السجل الطبي
                      </button>
                      <button
                        onClick={() => openAdmissionModal(patient)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>إجراءات الدخول</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'OPD_TRIAGE' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>طابور المراجعين بالاستشارية والفرز الأولي</span>
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                تصنيف الحالات حسب درجة الاستعجال وإجراءات الدخول للردهات
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>إحالة طارئة</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>حالة عاجلة</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {opdQueue.map((item) => {
              const isRed = item.triage_level === 'EMERGENCY_RED';
              const isYellow = item.triage_level === 'URGENT_YELLOW';
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isRed 
                      ? 'bg-rose-50/50 border-rose-200' 
                      : isYellow
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700 text-xs">{item.ticket_number}</span>
                      <h5 className="font-semibold text-slate-900">{item.patient_name}</h5>
                      <span className="text-[11px] text-slate-500">({item.age} سنة)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        isRed ? 'bg-rose-100 text-rose-800' : isYellow ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isRed ? 'إحالة طارئة' : isYellow ? 'عاجل' : 'اعتيادي'}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{item.referral_details}</p>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      الطبيب الاستشاري: {item.assigned_doctor} | وقت الوصول: {item.arrival_time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openAdmissionModal({
                        full_name: item.patient_name,
                        age: item.age,
                        mother_name: 'قيد التدوين بالاستشارية',
                        primary_diagnosis: item.referral_details
                      })}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>إدخال للردهة</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isAdmissionOpen && candidateForAdmission && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>إجراءات إدخال المريض للرقود السريري</span>
              </h4>
              <button 
                onClick={() => setIsAdmissionOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-base"
              >
                ✕
              </button>
            </div>

            {admissionSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم إدخال المريض للردهة وتخصيص السرير بنجاح.</span>
              </div>
            )}

            <form onSubmit={handleConfirmAdmission} className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-900 text-sm">{candidateForAdmission.full_name}</div>
                <div className="text-slate-500">اسم الأم: {candidateForAdmission.mother_name} | العمر: {candidateForAdmission.age || 35} سنة</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">الردهة السريرية:</label>
                  <select
                    value={selectedWardId}
                    onChange={(e) => setSelectedWardId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                  >
                    {wards.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.arabic_name} ({w.occupied_beds}/{w.total_beds} سرير)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">رقم السرير:</label>
                  <input
                    type="text"
                    value={selectedBedNumber}
                    onChange={(e) => setSelectedBedNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">الحمية الغذائية:</label>
                  <select
                    value={admissionDiet}
                    onChange={(e) => setAdmissionDiet(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                  >
                    <option value="NORMAL">طعام اعتيادي</option>
                    <option value="DIABETIC">حمية سكري</option>
                    <option value="LOW_SODIUM">قليل الصوديوم</option>
                    <option value="PUREED">طعام مهروس</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">نوع الدخول:</label>
                  <select
                    value={admissionType}
                    onChange={(e) => setAdmissionType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                  >
                    <option value="INVOLUNTARY_CIVIL">دخول إلزامي مدني (قانون الصحة النفسية)</option>
                    <option value="FORENSIC">إيداع قضائي عدلي (مادة 78/80 عقوبات)</option>
                    <option value="VOLUNTARY">دخول طوعي</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
              >
                تأكيد الإدخال الرسمي للردهة
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

