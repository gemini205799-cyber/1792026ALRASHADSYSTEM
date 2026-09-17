import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  Search, 
  Activity,
  FileSpreadsheet
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const EnterpriseHRModule: React.FC = () => {
  const { auditLogs } = useHospital();
  const [activeTab, setActiveTab] = useState<'SHIFT_ROSTER' | 'AUDIT_LOG' | 'RATIO_MONITOR'>('SHIFT_ROSTER');
  const [auditSearch, setAuditSearch] = useState('');

  // 970+ Staff sample shift roster
  const staffSample = [
    { id: 'stf-01', name: 'د. عمار فاروق الجنابي', role: 'استشاري الطب النفسي العدلي', ward: 'جناح الطب العدلي (ردهة 4)', shift: 'صباحي (08:00 - 15:00)', status: 'ON_DUTY' },
    { id: 'stf-02', name: 'د. سارة ضياء الحسني', role: 'طبيب مقيم أقدم طب نفسي', ward: 'ردهة 1 (رجال حادة)', shift: 'خفارة 24 ساعة', status: 'ON_DUTY' },
    { id: 'stf-03', name: 'م. كاظم عيسى جبر', role: 'ممرض جامعي مسؤول ردهة', ward: 'ردهة 4 (العدلية)', shift: 'صباحي (07:30 - 15:00)', status: 'ON_DUTY' },
    { id: 'stf-04', name: 'م. ثائر محمود الساعدي', role: 'ممرض سريري معتمد', ward: 'ردهة 1 (رجال حادة)', shift: 'صباحي (07:30 - 15:00)', status: 'ON_DUTY' },
    { id: 'stf-05', name: 'أ. كريم عبد الحسين حسن', role: 'باحث اجتماعي أول', ward: 'شعبة الخدمة الاجتماعية', shift: 'صباحي (08:00 - 14:00)', status: 'ON_DUTY' },
    { id: 'stf-06', name: 'السيد عماد عادل السامرائي', role: 'مسؤول المطبخ والإعاشة', ward: 'المطبخ المركزي (Zone E)', shift: 'صباحي (06:00 - 15:00)', status: 'ON_DUTY' },
    { id: 'stf-07', name: 'ضابط خفر أركان مهدي', role: 'مسؤول الحراسات وأمن الحرم', ward: 'بوابة القناة والأبراج', shift: 'خفارة أمنية 24 ساعة', status: 'ON_DUTY' },
    { id: 'stf-08', name: 'ص. نور مهدي صالح', role: 'صيدلاني مسؤول المذخر', ward: 'المذخر المركزي للصيدلة', shift: 'صباحي (08:00 - 14:30)', status: 'ON_DUTY' }
  ];

  const filteredLogs = auditLogs.filter(log => 
    log.user_name.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.hash.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              الموارد البشرية وسجل تدقيق العمليات
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              970+ موظف وملاك
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            جدول الخفارات والمناوبات السريرية، ومتابعة نسب الكوادر التمريضية وسجل العمليات الإدارية والطبية.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span>التوثيق الرقمي: <strong className="text-slate-800 font-mono">سجل غير قابل للتعديل</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('SHIFT_ROSTER')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'SHIFT_ROSTER'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>جدول المناوبات والخفارات</span>
        </button>
        <button
          onClick={() => setActiveTab('AUDIT_LOG')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'AUDIT_LOG'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>سجل التدقيق والعمليات ({auditLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('RATIO_MONITOR')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'RATIO_MONITOR'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>نسبة الممرضين للمرضى</span>
        </button>
      </div>

      {/* TAB 1: SHIFT ROSTER */}
      {activeTab === 'SHIFT_ROSTER' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>ملاك المناوبة الصباحية الحالية</span>
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                توزيع الأطباء، الممرضين، الباحثين الاجتماعيين، والكوادر الفنية والأمنية.
              </p>
            </div>
            <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              إجمالي الكادر: 970 موظفاً
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                  <th className="p-3">اسم الموظف</th>
                  <th className="p-3">المسمى والتخصص</th>
                  <th className="p-3">مكان العمل / الردهة</th>
                  <th className="p-3">توقيت المناوبة</th>
                  <th className="p-3 text-center">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staffSample.map((stf) => (
                  <tr key={stf.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{stf.name}</td>
                    <td className="p-3 text-blue-700 font-medium">{stf.role}</td>
                    <td className="p-3 text-slate-600">{stf.ward}</td>
                    <td className="p-3 font-mono text-slate-500">{stf.shift}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        على رأس العمل
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOG */}
      {activeTab === 'AUDIT_LOG' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                سجل تدقيق الإجراءات والقرارات الطبية
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                توثيق كامل لإجراءات إعطاء الأدوية، توقيع اللجان، أوامر التقييد، وحركات الأمانات.
              </p>
            </div>

            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="بحث في السجل..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-9 pl-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-0.5">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{log.user_name}</span>
                    <span className="text-[11px] px-2 py-0.2 rounded bg-slate-200 text-slate-700 font-mono">
                      {log.role}
                    </span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">{log.timestamp}</span>
                </div>

                <p className="text-slate-700 font-medium">
                  <strong className="text-blue-700 font-mono ml-1">[{log.action}]</strong>
                  {log.details}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                  <span>المحطة: {log.ip_address}</span>
                  <span className="text-slate-600 truncate max-w-xs sm:max-w-md">
                    SHA256: {log.hash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NURSE-TO-PATIENT RATIO MONITOR */}
      {activeTab === 'RATIO_MONITOR' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>مؤشر التغطية التمريضية للردهات (Nurse-to-Patient Ratio)</span>
            </h4>
            <p className="text-slate-500 text-xs mt-0.5">
              المعيار المعتمد: 1:12 في الردهات الحادة والعدلية، و 1:25 في ردهات الرقود الممتد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-600 text-[11px] block">ردهة 4 (الطب النفسي العدلي)</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">1 : 10</div>
              <p className="text-[11px] text-emerald-700">12 ممرضاً على 120 نزيلاً — متطابق مع المعايير</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-600 text-[11px] block">ردهة 1 (رجال حادة)</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">1 : 14</div>
              <p className="text-[11px] text-amber-700">10 ممرضين على 140 نزيلاً — مقبول سريرياً</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-600 text-[11px] block">ردهة 10 (طب نفسي المسنين)</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">1 : 15</div>
              <p className="text-[11px] text-emerald-700">8 ممرضين على 120 نزيلاً — مستقر</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
