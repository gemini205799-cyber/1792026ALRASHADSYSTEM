import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Utensils, 
  Navigation,
  Compass,
  PhoneCall,
  Bed
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const CampusSpatialMap: React.FC = () => {
  const { wards, setActiveDomain } = useHospital();
  const [selectedZone, setSelectedZone] = useState<string>('ALL');

  const zones = [
    { id: 'ALL', name: 'كامل المجمع (89 دونم)' },
    { id: 'Zone A', name: 'المنطقة A (الردهات الحادة والأمنية)' },
    { id: 'Zone B', name: 'المنطقة B (الردهات النسائية)' },
    { id: 'Zone C', name: 'المنطقة C (الطب النفسي العدلي)' },
    { id: 'Zone D', name: 'المنطقة D (رعاية المسنين والتأهيل)' },
    { id: 'Zone E', name: 'المنطقة E (المطبخ المركزي والورش)' }
  ];

  const filteredWards = selectedZone === 'ALL' 
    ? wards 
    : wards.filter(w => w.building_zone.includes(selectedZone));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              المخطط المكاني للمستشفى (89 دونم)
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              مجمع الرشاد الطبي
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            التوزيع المكاني للمباني السريرية، المطبخ المركزي، البوابات، وشبكة المسارات الداخلية.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
          <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
          <span>بدالة الأمن والسلامة الداخلية: 104 / داخلي 2200</span>
        </div>
      </div>

      {/* Zone Filter Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-medium shrink-0 ml-1">المنطقة:</span>
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelectedZone(z.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedZone === z.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {z.name}
          </button>
        ))}
      </div>

      {/* Spatial Campus Grid Canvas / Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Visual 2D Campus Map representation */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs relative overflow-hidden min-h-[480px] flex flex-col justify-between">
          {/* Top Campus Perimeter */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5 text-blue-700 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>البوابة الرئيسية (شارع القناة)</span>
            </span>
            <span>السياج الأمني المحيط (89 دونم)</span>
            <span className="text-slate-600">مدخل الطوارئ والإسعاف</span>
          </div>

          {/* Interactive Campus Buildings Map Clusters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
            {/* Central Kitchen Facility (Zone E) */}
            <div 
              onClick={() => setActiveDomain('CAMPUS_CATERING')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                  <Utensils className="w-4 h-4 text-blue-600" />
                  <span>المطبخ المركزي (Zone E)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  يعمل الآن
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                إنتاج 6,000 وجبة يومياً ومحطة عربات التوزيع للردهات
              </p>
            </div>

            {/* Forensic Pavilion (Zone C - High Security) */}
            <div 
              onClick={() => setActiveDomain('MLEGAL')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>جناح الطب النفسي العدلي (Zone C)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                  حراسة أمنية
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                ردهة 4 - إيداع قضائي للمودعين ومقر اللجان الطبية العدلية
              </p>
            </div>

            {/* Central Pharmacy & Psychotropics Vault */}
            <div 
              onClick={() => setActiveDomain('EMAR_PHARMACY')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>الصيدلية المركزية ومذخر الأدوية</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                  خزنة الأدوية
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                خزنة المؤثرات العقلية والسموم ونظام الباركود الدوائي
              </p>
            </div>

            {/* Administration & Central Archive */}
            <div 
              onClick={() => setActiveDomain('OPD_ARCHIVE')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>مبنى الإدارة والأرشيف الطبي</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                  الاستشارية
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                العيادات الخارجية واستقبال المراجعين وأرشيف الإضبارات
              </p>
            </div>

            {/* Recreational & Occupational Therapy Gardens */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-1 sm:col-span-2 shadow-2xs">
              <div className="flex items-center justify-between text-slate-900 font-semibold text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>الحدائق العلاجية وورش التأهيل النفسي المهني</span>
                </span>
                <span className="text-[11px] font-medium text-emerald-700">مساحات خضراء مفتوحة: 35 دونم</span>
              </div>
              <p className="text-[11px] text-slate-500">
                ورش النجارة، الحلاقة، الزراعة المحمية، ومسارات المشي الآمنة تحت إشراف التأهيل النفسي والخدمة الاجتماعية.
              </p>
            </div>
          </div>

          {/* Bottom Campus Perimeter */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>البوابة الجنوبية (مدخل الخدمات والتموين)</span>
            <span>محطة التوليد والمولدات الكهربائية</span>
            <span>أبراج المراقبة المحيطة</span>
          </div>
        </div>

        {/* Right 4 Cols: Ward Bed Roster in Current Zone */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Bed className="w-4 h-4 text-blue-600" />
              <span>الردهات السريرية ({filteredWards.length} ردهة):</span>
            </h3>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-0.5">
              {filteredWards.map((w) => {
                const occ = Math.round((w.occupied_beds / w.total_beds) * 100);
                return (
                  <div
                    key={w.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900">{w.arabic_name}</h4>
                      <span className="font-mono text-slate-700 font-bold">{w.occupied_beds}/{w.total_beds}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{w.building_zone}</span>
                      <span>مسؤول الردهة: {w.head_nurse}</span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${occ}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
