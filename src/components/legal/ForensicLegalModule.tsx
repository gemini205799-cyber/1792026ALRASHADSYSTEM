import React, { useState } from 'react';
import { 
  Scale, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Fingerprint, 
  UserCheck, 
  Printer, 
  Clock
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { ForensicLegalOrder } from '../../types';

export const ForensicLegalModule: React.FC = () => {
  const { 
    forensicOrders, 
    signForensicReport, 
    openPrintDocument, 
    patients, 
    setSelectedPatientId, 
    setActiveDomain 
  } = useHospital();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(forensicOrders[0]?.id || 'leg-001');
  const [activeTab, setActiveTab] = useState<'BOARD_REPORTS' | 'COURT_ORDERS' | 'BIOMETRICS_UNIDENTIFIED'>('BOARD_REPORTS');
  const [doctorSignName, setDoctorSignName] = useState('د. عمار فاروق الجنابي (رئيس اللجنة العدلية)');
  const [responsibilityDecision, setResponsibilityDecision] = useState<'RESPONSIBLE' | 'NOT_RESPONSIBLE_INSANE' | 'DIMINISHED_RESPONSIBILITY'>('NOT_RESPONSIBLE_INSANE');
  const [signSuccessBanner, setSignSuccessBanner] = useState(false);

  const selectedOrder = forensicOrders.find(o => o.id === selectedOrderId) || forensicOrders[0];
  const relatedPatient = patients.find(p => p.id === selectedOrder?.patient_id);

  // Unidentified court patients
  const unidentifiedPatients = patients.filter(p => p.is_unidentified || p.admission_type === 'FORENSIC');

  const handleSignReport = () => {
    if (!selectedOrder) return;
    signForensicReport(selectedOrder.id, doctorSignName, responsibilityDecision);
    setSignSuccessBanner(true);
    setTimeout(() => setSignSuccessBanner(false), 3000);
  };

  const handlePrintOfficialReport = () => {
    if (!selectedOrder) return;
    openPrintDocument({
      type: 'FORENSIC_REPORT',
      title: `تقرير اللجنة الطبية العدلية القضائي — ${selectedOrder.patient_name}`,
      data: selectedOrder
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Institutional Legal Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              شعبة الطب النفسي العدلي واللجان الطبية
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
              قرارات المحاكم والإيداع
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            متابعة قرارات الإيداع بموجب المواد (78، 80، 60) من قانون العقوبات العراقي، تقارير اللجان الطبية، والبصمات.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrintOfficialReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة تقرير اللجنة</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('BOARD_REPORTS')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            activeTab === 'BOARD_REPORTS'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          اللجان الطبية وقرارات المسؤولية
        </button>
        <button
          onClick={() => setActiveTab('COURT_ORDERS')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
            activeTab === 'COURT_ORDERS'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          جدول متابعة المحاكم ({forensicOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('BIOMETRICS_UNIDENTIFIED')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'BIOMETRICS_UNIDENTIFIED'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Fingerprint className="w-3.5 h-3.5 text-slate-500" />
          <span>البصمات ومجهولو الهوية</span>
        </button>
      </div>

      {/* TAB 1: BOARD REPORTS & SIGNING */}
      {activeTab === 'BOARD_REPORTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Forensic Cases List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-2">
              <span className="font-semibold text-xs text-slate-700 block mb-2">
                قضايا المودعين تحت فحص اللجان:
              </span>

              {forensicOrders.map((ord) => {
                const isSelected = ord.id === selectedOrderId;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-2xs'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-slate-900">{ord.patient_name}</h4>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {ord.committee_type}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1">{ord.court_name}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>دعوى: {ord.case_number}</span>
                      <span className={`font-medium ${
                        ord.committee_status === 'COMPLETED' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {ord.committee_status === 'COMPLETED' ? 'مكتمل وموقع' : 'قيد الملاحظة'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Forensic Board Evaluation & Digital Signing */}
          <div className="lg:col-span-8 space-y-4">
            {selectedOrder ? (
              <div className="p-5 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-5 text-xs">
                {/* Case Header Details */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{selectedOrder.patient_name}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                        {selectedOrder.legal_article}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      الجهة المحيلة: <strong>{selectedOrder.court_name}</strong> | رقم الإضبارة: <strong>{selectedOrder.case_number}</strong>
                    </p>
                  </div>

                  <div className="text-left font-mono shrink-0">
                    <span className="text-slate-500 block text-[10px]">نهاية فترة الملاحظة:</span>
                    <span className="text-slate-900 font-bold text-xs">{selectedOrder.observation_end_date}</span>
                  </div>
                </div>

                {/* Committee Members */}
                <div className="space-y-2">
                  <span className="font-semibold text-slate-800 block flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>أعضاء اللجنة الطبية النفسية العدلية ({selectedOrder.committee_type}):</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedOrder.committee_members?.map((member, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium">
                        {member}
                      </div>
                    )) || (
                      <div className="text-slate-500 italic p-2">لجنة استشارية من أطباء المستشفى</div>
                    )}
                  </div>
                </div>

                {/* Forensic Clinical Questions */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <span className="font-semibold text-slate-900 block">
                    محاور التقرير الطبي والمسؤولية الجزائية:
                  </span>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-semibold text-slate-800 block">
                        1. هل المتهم مصاب بعاهة عقلية تفقده الإدراك وحرية الاختيار وقت ارتكاب الفعل؟
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        نعم، النزيل يعاني من اضطراب فصامي ذهاني مزمن، وكان مسلوب الإرادة والإدراك بموجب أحكام المادة 60/عقوبات.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-semibold text-slate-800 block">
                        2. هل يشكل المتهم خطورة على نفسه أو السلامة العامة في حال إخلاء سبيله؟
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        نعم، لوجود ضلالات اضطهادية شديدة وهلاوس أمرية تتطلب إيداعه المستمر في مأوى احترازي (المادة 78/عقوبات).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Digital Signing Station */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>المصادقة والتوقيع على قرار اللجنة:</span>
                    </span>
                    {selectedOrder.digital_signature_hash && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        تمت المصادقة والتوقيع
                      </span>
                    )}
                  </div>

                  {signSuccessBanner && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>تم توقيع التقرير العدلي وتوثيقه بسجل القضايا بنجاح.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 block mb-1">قرار المسؤولية الجزائية المعتمد:</label>
                      <select
                        value={responsibilityDecision}
                        onChange={(e) => setResponsibilityDecision(e.target.value as any)}
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 font-medium text-xs"
                      >
                        <option value="NOT_RESPONSIBLE_INSANE">غير مسؤول جزائياً لمرض عقلي جسيم (مادة 60)</option>
                        <option value="DIMINISHED_RESPONSIBILITY">مسؤولية منقوصة جزئياً تتطلب تخفيفاً ومتابعة</option>
                        <option value="RESPONSIBLE">مسؤول جزائياً وسليم الإدراك</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1">اسم الطبيب الموقع ورتبته:</label>
                      <input
                        type="text"
                        value={doctorSignName}
                        onChange={(e) => setDoctorSignName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                      />
                    </div>
                  </div>

                  {selectedOrder.digital_signature_hash ? (
                    <div className="p-2.5 bg-white rounded-md border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                      <span>رقم التوثيق الرقمي: {selectedOrder.digital_signature_hash}</span>
                      <span className="text-slate-400">{selectedOrder.signed_at}</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignReport}
                      className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      المصادقة والتوقيع النهائي على قرار اللجنة العدلية
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 2: COURT ORDERS & DEADLINES */}
      {activeTab === 'COURT_ORDERS' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>جدول متابعة قرارات المحاكم ومواعيد إنهاء الملاحظة القضائية</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                    <th className="p-3">اسم المودع</th>
                    <th className="p-3">المحكمة المختصة</th>
                    <th className="p-3">رقم الدعوى</th>
                    <th className="p-3">المادة القانونية</th>
                    <th className="p-3">تاريخ الإحالة</th>
                    <th className="p-3">نهاية الملاحظة</th>
                    <th className="p-3">حالة اللجنة</th>
                    <th className="p-3 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {forensicOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">{ord.patient_name}</td>
                      <td className="p-3 text-slate-600">{ord.court_name}</td>
                      <td className="p-3 font-mono text-slate-700">{ord.case_number}</td>
                      <td className="p-3 text-slate-700">{ord.legal_article}</td>
                      <td className="p-3 font-mono text-slate-500">{ord.order_date}</td>
                      <td className="p-3 font-mono font-medium text-slate-900">{ord.observation_end_date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          ord.committee_status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {ord.committee_status === 'COMPLETED' ? 'مكتمل' : 'قيد المتابعة'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedOrderId(ord.id);
                            setActiveTab('BOARD_REPORTS');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors cursor-pointer"
                        >
                          معاينة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BIOMETRICS & UNIDENTIFIED PATIENTS */}
      {activeTab === 'BIOMETRICS_UNIDENTIFIED' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-600" />
                <span>سجل النزلاء مجهولي الهوية والمحالين بدون مستمسكات ثبوتية</span>
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                ربط البصمات العشرية مع مديرية الأدلة الجنائية لمطابقة الهوية وقرارات الحفظ القضائية.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unidentifiedPatients.slice(0, 3).map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={p.photo_url} alt="" className="w-11 h-11 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <h5 className="font-semibold text-slate-900">{p.full_name}</h5>
                      <span className="text-[11px] text-blue-700 font-mono">{p.archive_number}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">الردهة: {p.ward_id} (سرير {p.bed_number})</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">البصمة العشرية:</span>
                      <span className="text-slate-800 font-mono">{p.fingerprint_hash || 'FP-SHA256-PENDING'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">محكمة الإحالة:</span>
                      <span className="text-slate-800">{p.custody_court || 'محكمة تحقيق الشعب'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setActiveDomain('SEHR');
                    }}
                    className="w-full py-1.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium text-center block transition-colors cursor-pointer"
                  >
                    عرض الملف الطبي للنزيل
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
