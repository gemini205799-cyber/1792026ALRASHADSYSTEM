import React from 'react';
import { 
  Building2, 
  Users, 
  Utensils, 
  Pill, 
  Scale, 
  Archive, 
  AlertTriangle, 
  Bed, 
  Clock, 
  MapPin, 
  Activity, 
  ArrowLeft,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const CampusOverview: React.FC = () => {
  const { 
    wards, 
    patients, 
    restraintLogs, 
    forensicOrders, 
    opdQueue, 
    setActiveDomain, 
    setSelectedPatientId,
    openBarcodeScanner
  } = useHospital();

  const totalBeds = wards.reduce((sum, w) => sum + w.total_beds, 0);
  const occupiedBeds = wards.reduce((sum, w) => sum + w.occupied_beds, 0);
  const occupancyPercentage = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  const activeRestraints = restraintLogs.filter(r => r.active);
  const pendingForensicCases = forensicOrders.filter(f => f.committee_status === 'PENDING' || f.committee_status === 'SCHEDULED');
  const waitingOpd = opdQueue.filter(q => q.status === 'WAITING' || q.status === 'IN_CONSULTATION');

  const specialDietCount = patients.filter(p => p.dietary_type !== 'REGULAR').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>اليوم: الخميس — المناوبة الصباحية</span>
              <span className="text-slate-300">•</span>
              <span>12 ردهة علاجية</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              لوحة المتابعة العامة والعمليات السريرية
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              متابعة حالة النزلاء، التوزيع السريري، وجبات الإعاشة، وجلسات اللجان الطبية العدلية.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openBarcodeScanner()}
              className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>فحص الباركود</span>
            </button>
            <button
              onClick={() => setActiveDomain('CAMPUS_MAP')}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>مخطط الأقسام</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Beds */}
        <div 
          onClick={() => setActiveDomain('SEHR')}
          className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>المرضى الراقدين</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">{occupiedBeds}</span>
            <span className="text-xs text-slate-400 font-mono">/ {totalBeds} سرير</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>نسبة الإشغال: <strong className="text-blue-700 font-mono">{occupancyPercentage}%</strong></span>
            <span className="text-[11px] text-slate-400">12 ردهة</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${occupancyPercentage}%` }} />
          </div>
        </div>

        {/* KPI 2: Catering */}
        <div 
          onClick={() => setActiveDomain('CAMPUS_CATERING')}
          className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>الإعاشة والمطبخ</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">6,000</span>
            <span className="text-xs text-slate-400">وجبة يومياً</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>4 وجبات لكل مريض</span>
            <span className="text-[11px] text-emerald-700 font-medium">وجبة الغداء جاهزة</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[65%]" />
          </div>
        </div>

        {/* KPI 3: Controlled Drugs */}
        <div 
          onClick={() => setActiveDomain('EMAR_PHARMACY')}
          className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>المؤثرات العقلية المقيدة</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">100%</span>
            <span className="text-xs text-emerald-700 font-medium">مطابقة الخزنة</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>5 أصناف خاضعة للرقابة</span>
            <span className="text-[11px] text-slate-400">تسجيل الصرف ثنائي</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-[100%]" />
          </div>
        </div>

        {/* KPI 4: Archive */}
        <div 
          onClick={() => setActiveDomain('OPD_ARCHIVE')}
          className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-xs transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>الأرشيف المركزي</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Archive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 font-mono">65,420</span>
            <span className="text-xs text-slate-400">ملف مسجل</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <span>سجلات المرضى والمودعين</span>
            <span className="text-[11px] text-purple-700 font-medium">مفهرس بالكامل</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[95%]" />
          </div>
        </div>
      </div>

      {/* Safety Alert (Clinical Restraint Notice) */}
      {activeRestraints.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">ملاحظة تمريضية مشددة (فحص دوري كل 15 دقيقة)</span>
                <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded font-semibold">إجراء احترازي</span>
              </div>
              <p className="text-xs text-rose-700 mt-0.5">
                المريض: <span className="font-semibold">{activeRestraints[0].patient_name}</span> — {activeRestraints[0].ward_id} (غرفة الملاحظة) — السبب: {activeRestraints[0].authorization_reason}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedPatientId(activeRestraints[0].patient_id);
              setActiveDomain('SEHR');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shrink-0 transition-colors cursor-pointer"
          >
            سجل الملاحظة
          </button>
        </div>
      )}

      {/* Main Grid: Wards Overview (2 cols) & Side Tasks (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wards Matrix */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>حالة الردهات والأقسام السريرية (12 ردهة)</span>
            </h3>
            <button
              onClick={() => setActiveDomain('CAMPUS_MAP')}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>عرض المخطط العام</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wards.map((ward) => {
              const occPercent = Math.round((ward.occupied_beds / ward.total_beds) * 100);
              const isFull = occPercent >= 99;
              return (
                <div
                  key={ward.id}
                  onClick={() => setActiveDomain('CAMPUS_MAP')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${ward.gender === 'FORENSIC' ? 'bg-amber-500' : ward.gender === 'FEMALE' ? 'bg-pink-500' : 'bg-blue-500'}`} />
                        <h4 className="font-semibold text-xs text-slate-800 truncate">
                          {ward.arabic_name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ward.building_zone}</p>
                    </div>

                    <span className={`text-[11px] px-2 py-0.5 rounded font-mono font-semibold ${
                      isFull ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ward.occupied_beds} / {ward.total_beds}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate">المسؤول: {ward.head_nurse}</span>
                    <span className="font-mono font-medium text-slate-700">{occPercent}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isFull ? 'bg-rose-500' : ward.gender === 'FORENSIC' ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ width: `${occPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Panel: Forensic & OPD Queue */}
        <div className="space-y-4">
          {/* Forensic Panel */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>اللجان الطبية العدلية</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">
                {pendingForensicCases.length} قضايا للمتابعة
              </span>
            </div>

            <div className="space-y-2">
              {forensicOrders.slice(0, 2).map((order) => (
                <div 
                  key={order.id}
                  onClick={() => setActiveDomain('MLEGAL')}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>{order.patient_name}</span>
                    <span className="text-[11px] text-amber-700 font-medium">{order.committee_type}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {order.court_name} — {order.legal_article}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                    <span>رقم الإضبارة: {order.case_number}</span>
                    <span>انتهاء الملاحظة: {order.observation_end_date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveDomain('MLEGAL')}
              className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium text-center block transition-colors cursor-pointer"
            >
              عرض سجل اللجان والقضايا
            </button>
          </div>

          {/* OPD Queue */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>مراجعي العيادة الاستشارية اليوم</span>
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">
                {waitingOpd.length} بالانتظار
              </span>
            </div>

            <div className="space-y-2">
              {opdQueue.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveDomain('OPD_ARCHIVE')}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.triage_level === 'EMERGENCY_RED' ? 'bg-rose-500' : item.triage_level === 'URGENT_YELLOW' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span>{item.patient_name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {item.referral_details}
                    </p>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs font-semibold text-blue-700">{item.ticket_number}</span>
                    <span className="block text-[10px] text-slate-400">{item.arrival_time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveDomain('OPD_ARCHIVE')}
              className="w-full py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium text-center block transition-colors cursor-pointer"
            >
              فرز المراجعين وإجراءات الدخول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
