import React from 'react';
import { 
  LayoutDashboard, 
  FileHeart, 
  Scale, 
  UtensilsCrossed, 
  Pill, 
  Archive, 
  Users2, 
  MapPin, 
  ShieldAlert,
  WalletCards,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useHospital, ActiveDomain } from '../../context/HospitalContext';

export const Sidebar: React.FC = () => {
  const { 
    activeDomain, 
    setActiveDomain, 
    activeLanguage,
    restraintLogs,
    depotAlerts,
    opdQueue,
    forensicOrders,
    mealManifests
  } = useHospital();

  const activeRestraintsCount = restraintLogs.filter(r => r.active).length;
  const overdueDepotCount = depotAlerts.filter(d => d.status === 'OVERDUE' || d.status === 'DUE_TODAY').length;
  const pendingOpdCount = opdQueue.filter(q => q.status === 'WAITING').length;
  const pendingForensicCount = forensicOrders.filter(f => f.committee_status === 'PENDING').length;

  interface NavItem {
    id: ActiveDomain;
    labelAr: string;
    labelEn: string;
    subtextAr: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }

  const navigationItems: NavItem[] = [
    {
      id: 'CAMPUS_OVERVIEW',
      labelAr: 'الرئيسية والمتابعة العامة',
      labelEn: 'Hospital Overview',
      subtextAr: 'إشغال الأسرة وحالة الردهات',
      icon: LayoutDashboard
    },
    {
      id: 'SEHR',
      labelAr: 'سجلات المرضى الراقدين',
      labelEn: 'Inpatient Records',
      subtextAr: 'الملفات الطبية وتقييم الحالات',
      icon: FileHeart,
      badge: activeRestraintsCount > 0 ? activeRestraintsCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 font-medium'
    },
    {
      id: 'MLEGAL',
      labelAr: 'اللجان الطبية العدلية',
      labelEn: 'Forensic Medical Board',
      subtextAr: 'القرارات القضائية ومحاضر الفحص',
      icon: Scale,
      badge: pendingForensicCount > 0 ? pendingForensicCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 font-medium'
    },
    {
      id: 'CAMPUS_CATERING',
      labelAr: 'المطبخ والإعاشة',
      labelEn: 'Dietary & Trust Funds',
      subtextAr: 'الوجبات الغذائية وأمانات المرضى',
      icon: UtensilsCrossed
    },
    {
      id: 'EMAR_PHARMACY',
      labelAr: 'الصيدلية وجدول الأدوية',
      labelEn: 'Pharmacy & Medications',
      subtextAr: 'صرف الأدوية والمؤثرات العقلية',
      icon: Pill,
      badge: overdueDepotCount > 0 ? overdueDepotCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 font-medium'
    },
    {
      id: 'OPD_ARCHIVE',
      labelAr: 'الاستشارية والأرشيف',
      labelEn: 'OPD & Archive',
      subtextAr: 'استقبال العيادات وسجلات الأرشيف',
      icon: Archive,
      badge: pendingOpdCount > 0 ? pendingOpdCount : undefined,
      badgeColor: 'bg-blue-100 text-blue-800 font-medium'
    },
    {
      id: 'CAMPUS_MAP',
      labelAr: 'مخطط الردهات والأقسام',
      labelEn: 'Hospital Campus Map',
      subtextAr: 'الموقع الجغرافي وتوزيع المباني',
      icon: MapPin
    },
    {
      id: 'ENTERPRISE_HR',
      labelAr: 'الكوادر والمناوبات',
      labelEn: 'Staff & Shift Rosters',
      subtextAr: 'جدول الأطباء والتمريض وسجل العمليات',
      icon: Users2
    }
  ];

  return (
    <aside className="w-68 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto shadow-xs">
      {/* Quick Status Pill */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
          <span className="text-slate-600 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            الحالة التشغيلية
          </span>
          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
            طبيعية ومستقرة
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {activeLanguage === 'ar' ? 'أقسام النظام' : 'System Modules'}
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeDomain === item.id || (item.id === 'CAMPUS_OVERVIEW' && activeDomain === 'OVERVIEW') || (item.id === 'ENTERPRISE_HR' && activeDomain === 'HR_SECURITY');
          return (
            <button
              key={item.id}
              onClick={() => setActiveDomain(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-right transition-colors group cursor-pointer ${
                isActive
                  ? 'bg-blue-50/80 text-blue-900 font-semibold border-r-3 border-blue-600 shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div
                className={`p-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:text-slate-700 group-hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs truncate font-semibold">
                    {activeLanguage === 'ar' ? item.labelAr : item.labelEn}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                        item.badgeColor || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-normal">
                  {item.subtextAr}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Operational Summary */}
      <div className="p-3 m-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            المناوبة:
          </span>
          <span className="text-slate-800 font-semibold">الصباحية</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>غرف الملاحظة:</span>
          <span className="text-slate-800 font-semibold font-mono">
            {activeRestraintsCount} حالات
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>الإبر المتأخرة:</span>
          <span className="text-amber-700 font-semibold font-mono">
            {overdueDepotCount} حالات
          </span>
        </div>
      </div>
    </aside>
  );
};
