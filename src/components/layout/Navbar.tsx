import React from 'react';
import { 
  Building2, 
  Search, 
  Scan, 
  ShieldAlert, 
  UserCheck, 
  Utensils, 
  BedDouble, 
  Printer, 
  Activity,
  Globe
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    activeLanguage, 
    setActiveLanguage,
    setIsCommandPaletteOpen,
    openBarcodeScanner,
    wards,
    openPrintDocument
  } = useHospital();

  const totalBeds = wards.reduce((sum, w) => sum + w.total_beds, 0);
  const occupiedBeds = wards.reduce((sum, w) => sum + w.occupied_beds, 0);
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  const roles: { key: UserRole; titleAr: string; titleEn: string; icon: string }[] = [
    { key: 'CONSULTANT_PSYCHIATRIST', titleAr: 'د. استشاري طب نفسي', titleEn: 'Consultant Psychiatrist', icon: '🩺' },
    { key: 'WARD_HEAD_NURSE', titleAr: 'مسؤول تمريض الردهة', titleEn: 'Ward Head Nurse', icon: '💉' },
    { key: 'FORENSIC_LEGAL_OFFICER', titleAr: 'مقرر اللجان العدلية', titleEn: 'Forensic Legal Officer', icon: '⚖️' },
    { key: 'KITCHEN_SUPERVISOR', titleAr: 'مشرف المطبخ والإعاشة', titleEn: 'Kitchen Supervisor', icon: '🍲' },
    { key: 'SOCIAL_WORKER', titleAr: 'باحث اجتماعي (أمانات المرضى)', titleEn: 'Social Worker', icon: '📋' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-800 shadow-xs">
      {/* Top Institutional Bar */}
      <div className="bg-slate-100/90 px-4 py-1 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">
            جمهورية العراق — وزارة الصحة
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 hidden md:inline">
            دائرة صحة بغداد الرصافة
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>
              الإشغال السريري: <strong className="font-semibold text-slate-900">{occupiedBeds}</strong> / {totalBeds} ({occupancyRate}%)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-700">
            <Utensils className="w-3.5 h-3.5 text-slate-500" />
            <span>الوجبات اليومية المجهزة: <strong className="font-semibold text-slate-900">6,000</strong></span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Hospital Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 leading-tight">
              مستشفى الرشاد التدريبي للأمراض النفسية والعقلية
            </h1>
            <p className="text-xs text-slate-500">
              النظام الطبي والإداري الموحد
            </p>
          </div>
        </div>

        {/* Global Quick Search & Actions */}
        <div className="flex items-center gap-2 flex-1 max-w-xl justify-end">
          {/* Quick Search */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex-1 max-w-xs flex items-center justify-between gap-2 px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-300 transition-colors"
            title="البحث في الملفات والأسرة"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">بحث بالاسم أو رقم الأرشيف...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-600 rounded border border-slate-300">
              Ctrl+K
            </kbd>
          </button>

          {/* BCMA Barcode Scanner */}
          <button
            onClick={() => openBarcodeScanner()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg shadow-2xs transition-colors"
            title="ماسح الباركود للتحقق من المريض والدواء"
          >
            <Scan className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">ماسح الباركود</span>
          </button>

          {/* Quick Print */}
          <button
            onClick={() => openPrintDocument({
              type: 'MEAL_MANIFEST',
              title: 'مانيفست الإعاشة اليومي الموحد لمستشفى الرشاد',
              data: {}
            })}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg shadow-2xs transition-colors"
            title="طباعة التقرير اليومي"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">تقرير اليوم</span>
          </button>

          {/* User Role Switcher */}
          <div className="relative flex items-center bg-white rounded-lg border border-slate-300">
            <select
              value={currentUserRole}
              onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
              className="bg-transparent text-xs text-slate-800 font-medium px-2.5 py-1.5 outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.key} value={r.key} className="bg-white text-slate-800">
                  {r.icon} {activeLanguage === 'ar' ? r.titleAr : r.titleEn}
                </option>
              ))}
            </select>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setActiveLanguage(activeLanguage === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300"
            title="تبديل اللغة / Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{activeLanguage === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
