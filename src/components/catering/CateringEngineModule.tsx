import React, { useState } from 'react';
import { 
  Utensils, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  Truck, 
  FileSpreadsheet
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { MealWave } from '../../types';

export const CateringEngineModule: React.FC = () => {
  const { 
    wards, 
    patients, 
    mealWaves, 
    dispatchMealWave, 
    openPrintDocument,
    recordTrustFundTransaction
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'KITCHEN_ENGINE' | 'WARD_MANIFESTS' | 'TRUST_FUNDS'>('KITCHEN_ENGINE');
  const [selectedMealWave, setSelectedMealWave] = useState<MealWave>('LUNCH');
  const [selectedWardId, setSelectedWardId] = useState<string>(wards[0]?.id || 'ward-01');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'pat-001');

  // Trust Fund transaction state
  const [txnType, setTxnType] = useState<'DEPOSIT' | 'WITHDRAWAL'>('WITHDRAWAL');
  const [txnCount, setTxnCount] = useState<number>(15000);
  const [txnReason, setTxnReason] = useState('شراء مستلزمات نظافة وحلاقة وشاي من كافتيريا المستشفى');
  const [txnSuccess, setTxnSuccess] = useState(false);

  // Stats calculation
  const totalInpatients = patients.length;
  const normalDiets = patients.filter(p => p.dietary_type === 'NORMAL').length;
  const diabeticDiets = patients.filter(p => p.dietary_type === 'DIABETIC').length;
  const lowSodiumDiets = patients.filter(p => p.dietary_type === 'LOW_SODIUM').length;
  const pureedDiets = patients.filter(p => p.dietary_type === 'PUREED').length;

  const currentWaveData = mealWaves.find(m => m.wave === selectedMealWave) || mealWaves[1];
  const targetPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleDispatch = () => {
    dispatchMealWave(selectedMealWave, 'عادل حسين السامرائي (مسؤول الإعاشة)');
  };

  const handlePrintManifest = () => {
    openPrintDocument({
      type: 'MEAL_MANIFEST',
      title: `مانيفست إعاشة الردهات — وجبة ${selectedMealWave === 'BREAKFAST' ? 'الإفطار' : selectedMealWave === 'LUNCH' ? 'الغداء' : selectedMealWave === 'AFTERNOON_SNACK' ? 'العصرية' : 'العشاء'}`,
      data: { wave: selectedMealWave, wards, totalInpatients }
    });
  };

  const handleTrustFundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPatient) return;
    recordTrustFundTransaction(targetPatient.id, txnType, txnCount, txnReason);
    setTxnSuccess(true);
    setTimeout(() => setTxnSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              شعبة الإعاشة والمطبخ المركزي
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              6,000 وجبة يومياً
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            إدارة وتجهيز الوجبات الأربع اليومية المتطابقة مع الحميات السريرية للمرضى وأمانات النزلاء.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrintManifest}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة مانيفست الوجبات</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('KITCHEN_ENGINE')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'KITCHEN_ENGINE'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>المطبخ والوجبات الأربع</span>
        </button>
        <button
          onClick={() => setActiveTab('WARD_MANIFESTS')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'WARD_MANIFESTS'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>توزيع الردهات (12 ردهة)</span>
        </button>
        <button
          onClick={() => setActiveTab('TRUST_FUNDS')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'TRUST_FUNDS'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>خزينة أمانات النزلاء</span>
        </button>
      </div>

      {/* TAB 1: KITCHEN ENGINE (4 MEALS) */}
      {activeTab === 'KITCHEN_ENGINE' && (
        <div className="space-y-6">
          {/* 4-Meal Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mealWaves.map((wave) => {
              const isSelected = wave.wave === selectedMealWave;
              const isDone = wave.status === 'COMPLETED';
              const isPrepared = wave.status === 'PREPARED';
              return (
                <div
                  key={wave.id}
                  onClick={() => setSelectedMealWave(wave.wave)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-2xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{wave.arabic_name}</span>
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      isDone 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : isPrepared 
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {wave.status === 'COMPLETED' ? 'تم التوزيع' : wave.status === 'PREPARED' ? 'جاهز للإرسال' : 'قيد الطهي'}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-slate-500">{wave.scheduled_time}</div>

                  <div className="text-xs text-slate-700 font-medium line-clamp-1">
                    {wave.menu_description}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>حرارة الحفظ: <strong className="font-mono text-slate-800">{wave.temperature_celsius}°C</strong></span>
                    <span className="font-mono text-slate-700">1,500 وجبة</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Wave Control Deck */}
          <div className="p-5 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">
                    تجهيز وجبة: {currentWaveData.arabic_name}
                  </h3>
                  <span className="text-xs text-slate-700 font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {currentWaveData.scheduled_time}
                  </span>
                </div>
                <p className="text-slate-500 mt-1">
                  قائمة الطعام المعتمدة: {currentWaveData.menu_description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDispatch}
                  disabled={currentWaveData.status === 'COMPLETED'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentWaveData.status === 'COMPLETED'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>إرسال وتفريغ عربات الوجبة للردهات</span>
                </button>
              </div>
            </div>

            {/* Special Dietary Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">طعام اعتيادي:</span>
                <span className="font-bold text-lg text-slate-900 font-mono">{normalDiets}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">وجبات عامة</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">حمية سكري (Diabetic):</span>
                <span className="font-bold text-lg text-blue-700 font-mono">{diabeticDiets}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">بدون سكر مضاف</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">قليل الصوديوم (Low Salt):</span>
                <span className="font-bold text-lg text-amber-700 font-mono">{lowSodiumDiets}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">مرضى الضغط</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[11px]">طعام مهروس (Pureed):</span>
                <span className="font-bold text-lg text-purple-700 font-mono">{pureedDiets}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">صعوبة البلع والمسنين</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WARD MANIFESTS */}
      {activeTab === 'WARD_MANIFESTS' && (
        <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>جدول توزيع الوجبات على ردهات المجمع</span>
            </h4>
            <span className="text-slate-500">إجمالي النزلاء المستلمين: 1,500 نزيل</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                  <th className="p-3">اسم الردهة</th>
                  <th className="p-3">المنطقة السكنية</th>
                  <th className="p-3">النزلاء الراقدين</th>
                  <th className="p-3">اعتيادي</th>
                  <th className="p-3">حمية سكري</th>
                  <th className="p-3">قليل الصوديوم</th>
                  <th className="p-3">طعام مهروس</th>
                  <th className="p-3">حالة الاستلام</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wards.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{w.arabic_name}</td>
                    <td className="p-3 text-slate-500">{w.building_zone}</td>
                    <td className="p-3 font-mono font-bold text-slate-800">{w.occupied_beds}</td>
                    <td className="p-3 font-mono text-slate-600">{Math.round(w.occupied_beds * 0.75)}</td>
                    <td className="p-3 font-mono text-blue-700">{Math.round(w.occupied_beds * 0.15)}</td>
                    <td className="p-3 font-mono text-amber-700">{Math.round(w.occupied_beds * 0.07)}</td>
                    <td className="p-3 font-mono text-purple-700">{Math.round(w.occupied_beds * 0.03)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        مستلم ومطابق
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TRUST FUNDS */}
      {activeTab === 'TRUST_FUNDS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form to record deposit/withdrawal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3 text-xs">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-600" />
                <span>تسجيل حركة أمانات نقدية</span>
              </h4>

              {txnSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم تسجيل الحركة وتحديث رصيد النزيل بنجاح.</span>
                </div>
              )}

              <form onSubmit={handleTrustFundSubmit} className="space-y-3">
                <div>
                  <label className="text-slate-600 block mb-1">اختر المريض:</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.full_name} ({p.archive_number}) — رصيده: {p.trust_fund_balance.toLocaleString()} د.ع
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1">نوع الحركة:</label>
                    <select
                      value={txnType}
                      onChange={(e) => setTxnType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs font-semibold"
                    >
                      <option value="WITHDRAWAL">صرف / سحب (مشتريات)</option>
                      <option value="DEPOSIT">إيداع (أمانة من ذويه)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">المبلغ (د.ع):</label>
                    <input
                      type="number"
                      step={5000}
                      value={txnCount}
                      onChange={(e) => setTxnCount(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">بيان الصرف أو الإيداع:</label>
                  <input
                    type="text"
                    value={txnReason}
                    onChange={(e) => setTxnReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  توثيق الحركة في سجل الخزينة
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Patients Balance Overview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3 text-xs">
              <h4 className="font-bold text-sm text-slate-900">
                أرصدة أمانات المرضى والنزلاء
              </h4>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-0.5">
                {patients.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-xs text-slate-900">{p.full_name}</h5>
                      <span className="text-[11px] text-slate-500 font-mono">{p.archive_number} — ردهة {p.ward_id}</span>
                    </div>
                    <div className="text-left font-mono">
                      <span className="font-bold text-slate-900 text-sm">{p.trust_fund_balance.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 block">دينار عراقي</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
