import React, { useState } from 'react';
import { 
  Pill, 
  Scan, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Lock, 
  User, 
  Search, 
  Check 
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { EmarRecord } from '../../types';

export const EMARModule: React.FC = () => {
  const { 
    emarRecords, 
    controlledDrugs, 
    recordMedicationAdministration, 
    openBarcodeScanner, 
    openPrintDocument,
    patients,
    setSelectedPatientId,
    setActiveDomain
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'BEDSIDE_EMAR' | 'CONTROLLED_VAULT' | 'DEPOT_CALENDAR'>('BEDSIDE_EMAR');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchPatient, setSearchPatient] = useState('');

  // Administration action modal state
  const [selectedRecordForAdmin, setSelectedRecordForAdmin] = useState<EmarRecord | null>(null);
  const [witnessNurse, setWitnessNurse] = useState('ممرض جامعي ثائر محمود');
  const [refusalReason, setRefusalReason] = useState('المريض يرفض ابتلاع الحبة');

  const filteredEmar = emarRecords.filter(r => {
    const matchesStatus = filterStatus === 'ALL' || r.status === filterStatus;
    const matchesSearch = r.patient_name.includes(searchPatient) || 
                          r.medication_name.toLowerCase().includes(searchPatient.toLowerCase()) ||
                          r.ward_id.toLowerCase().includes(searchPatient.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAdministerAction = (recordId: string, status: 'GIVEN' | 'REFUSED' | 'OMITTED') => {
    recordMedicationAdministration(
      recordId, 
      status, 
      witnessNurse, 
      status === 'REFUSED' ? refusalReason : undefined
    );
    setSelectedRecordForAdmin(null);
  };

  const handlePrint24HrChart = () => {
    openPrintDocument({
      type: 'EMAR_CHART',
      title: 'سجل إعطاء الدواء التمريضي (24 ساعة)',
      data: emarRecords
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              إعطاء الأدوية التمريضي وخزنة المؤثرات العقلية
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              الصيدلية السريرية
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            متابعة إعطاء الجرعات الدوائية بجانب سرير المريض، رقابة أدوية الجدول المقيد، وجدولة حقن المستودع الممتدة.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint24HrChart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>طباعة سجل الـ 24 ساعة</span>
          </button>
          <button
            onClick={() => openBarcodeScanner((code) => {
              const matched = emarRecords.find(e => e.barcode === code);
              if (matched) setSelectedRecordForAdmin(matched);
            })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>مسح باركود الدواء</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('BEDSIDE_EMAR')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'BEDSIDE_EMAR'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>سجل إعطاء الدواء اليومي</span>
        </button>
        <button
          onClick={() => setActiveTab('CONTROLLED_VAULT')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'CONTROLLED_VAULT'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>خزنة المؤثرات العقلية المقيدة</span>
        </button>
        <button
          onClick={() => setActiveTab('DEPOT_CALENDAR')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'DEPOT_CALENDAR'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>جدول حقن المستودع الممتدة</span>
        </button>
      </div>

      {/* TAB 1: BEDSIDE EMAR */}
      {activeTab === 'BEDSIDE_EMAR' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  value={searchPatient}
                  onChange={(e) => setSearchPatient(e.target.value)}
                  placeholder="بحث باسم المريض أو الدواء أو الردهة..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-500 shrink-0">الحالة:</span>
              <div className="flex gap-1">
                {['ALL', 'SCHEDULED', 'GIVEN', 'REFUSED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      filterStatus === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'ALL' ? 'الكل' : st === 'SCHEDULED' ? 'مجدول' : st === 'GIVEN' ? 'أُعطي' : 'رُفض'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* eMAR Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEmar.map((record) => {
              const isGiven = record.status === 'GIVEN';
              const isRefused = record.status === 'REFUSED';
              const isScheduled = record.status === 'SCHEDULED';
              const relatedPatient = patients.find(p => p.id === record.patient_id);

              return (
                <div
                  key={record.id}
                  className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs space-y-3"
                >
                  {/* Top Bar: Patient and Time */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {relatedPatient ? (
                        <img 
                          src={relatedPatient.photo_url} 
                          alt="" 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{record.patient_name}</h4>
                        <div className="text-[11px] text-slate-500">
                          الردهة: <strong>{record.ward_id}</strong> | سرير: {relatedPatient?.bed_number || '01'}
                        </div>
                      </div>
                    </div>

                    <div className="text-left font-mono">
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{record.scheduled_time}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{record.barcode}</span>
                    </div>
                  </div>

                  {/* Medication Details Box */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 text-xs">{record.medication_name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                        دواء مقيد
                      </span>
                    </div>
                    <div className="text-slate-600 font-mono text-[11px]">
                      الجرعة: <strong className="text-slate-800">{record.dosage}</strong> | طريق الإعطاء: {record.route}
                    </div>
                  </div>

                  {/* Status Banner */}
                  {isGiven && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>تم الإعطاء الساعة {record.administered_time}</span>
                      </div>
                      <span className="text-[11px] text-emerald-700">
                        الشاهد: {record.witness_nurse}
                      </span>
                    </div>
                  )}

                  {isRefused && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>رُفضت الجرعة من قبل المريض</span>
                      </div>
                      <p className="text-[11px] text-rose-700">السبب: {record.omission_reason}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isScheduled && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedRecordForAdmin(record)}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>تسجيل إعطاء الجرعة</span>
                      </button>
                      <button
                        onClick={() => setSelectedRecordForAdmin(record)}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium transition-colors cursor-pointer"
                      >
                        رفض / إسقاط
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Administration Co-Sign Modal */}
          {selectedRecordForAdmin && (
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-xl p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">
                    تأكيد إعطاء الدواء والمطابقة التمريضية
                  </h4>
                  <button 
                    onClick={() => setSelectedRecordForAdmin(null)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer text-base"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-semibold text-slate-900">{selectedRecordForAdmin.medication_name} ({selectedRecordForAdmin.dosage})</div>
                  <div className="text-slate-500">المريض: {selectedRecordForAdmin.patient_name} | الردهة: {selectedRecordForAdmin.ward_id}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 block font-medium">اسم الممرض الشاهد على الجرعة:</label>
                  <input
                    type="text"
                    value={witnessNurse}
                    onChange={(e) => setWitnessNurse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleAdministerAction(selectedRecordForAdmin.id, 'GIVEN')}
                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    تأكيد الإعطاء وتحديث السجل
                  </button>
                  <button
                    onClick={() => handleAdministerAction(selectedRecordForAdmin.id, 'REFUSED')}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    تسجيل رفض
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CONTROLLED DRUGS VAULT */}
      {activeTab === 'CONTROLLED_VAULT' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>سجل ومذخر المؤثرات العقلية والرقابة الدوائية</span>
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                جرد ومطابقة أرصدة الأدوية الخاضعة للرقابة بين المذخر المركزي وصيدليات الردهات.
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              الجرد مطابق بنسبة 100%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                  <th className="p-3">الاسم العلمي والتجاري</th>
                  <th className="p-3">الشكل الصيدلاني</th>
                  <th className="p-3">جدول الرقابة</th>
                  <th className="p-3 font-mono">الرصيد الكلي</th>
                  <th className="p-3 font-mono">رصيد الردهات</th>
                  <th className="p-3">آخر تدقيق</th>
                  <th className="p-3 text-center">حالة الخزنة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {controlledDrugs.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{d.generic_name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{d.brand_name}</div>
                    </td>
                    <td className="p-3 text-slate-600">{d.formulation}</td>
                    <td className="p-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {d.schedule_class}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">{d.total_stock}</td>
                    <td className="p-3 font-mono text-slate-600">{d.allocated_to_wards}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{d.last_audit_date}</td>
                    <td className="p-3 text-center">
                      <span className="text-emerald-700 text-[11px] font-medium">مطابق</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DEPOT CALENDAR */}
      {activeTab === 'DEPOT_CALENDAR' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>جدول حقن المستودع الممتدة المفعول (Long-Acting Injectables)</span>
            </h4>
            <p className="text-slate-500 text-xs mt-0.5">
              متابعة مواعيد الحقن العضلية الدورية للنزلاء لتفادي الانتكاسات الذهانية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-slate-900">جاسم محمد كاظم (ردهة 4)</h5>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  كل 4 أسابيع
                </span>
              </div>
              <p className="text-slate-600">الدواء: <strong>Haloperidol Decanoate 100mg IM</strong></p>
              <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200 text-[11px]">
                <span>آخر جرعة: 2026-08-20</span>
                <span className="text-blue-700 font-medium">الموعد القادم: اليوم 10:00</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-slate-900">حيدر فاضل عبود (ردهة 1)</h5>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  شهرياً
                </span>
              </div>
              <p className="text-slate-600">الدواء: <strong>Paliperidone Palmitate 150mg IM</strong></p>
              <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200 text-[11px]">
                <span>آخر جرعة: 2026-08-28</span>
                <span className="text-emerald-700 font-medium">الموعد القادم: بعد 11 يوماً</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
