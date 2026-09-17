import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  User, 
  Bed, 
  Pill, 
  Scale, 
  Utensils, 
  FileText,
  Scan
} from 'lucide-react';
import { useHospital, ActiveDomain } from '../../context/HospitalContext';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen,
    patients,
    wards,
    controlledDrugs,
    setActiveDomain,
    setSelectedPatientId,
    openBarcodeScanner
  } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearchQuery('');
    }
  }, [isCommandPaletteOpen]);

  // Filter items
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients.slice(0, 4);
    const q = searchQuery.toLowerCase();
    return patients.filter(
      p => p.full_name.toLowerCase().includes(q) ||
           p.archive_number.toLowerCase().includes(q) ||
           (p.national_id && p.national_id.includes(q)) ||
           p.bed_number?.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [patients, searchQuery]);

  const filteredWards = useMemo(() => {
    if (!searchQuery.trim()) return wards.slice(0, 3);
    const q = searchQuery.toLowerCase();
    return wards.filter(
      w => w.name.toLowerCase().includes(q) ||
           w.arabic_name.toLowerCase().includes(q) ||
           w.building_zone.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [wards, searchQuery]);

  const filteredDrugs = useMemo(() => {
    if (!searchQuery.trim()) return controlledDrugs.slice(0, 2);
    const q = searchQuery.toLowerCase();
    return controlledDrugs.filter(
      d => d.generic_name.toLowerCase().includes(q) ||
           d.brand_name.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [controlledDrugs, searchQuery]);

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveDomain('SEHR');
    setIsCommandPaletteOpen(false);
  };

  const handleSelectWard = (wardId: string) => {
    setActiveDomain('CAMPUS_MAP');
    setIsCommandPaletteOpen(false);
  };

  const handleSelectDrug = (drugId: string) => {
    setActiveDomain('EMAR_PHARMACY');
    setIsCommandPaletteOpen(false);
  };

  const handleAction = (domain: ActiveDomain) => {
    setActiveDomain(domain);
    setIsCommandPaletteOpen(false);
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-200 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث فوري في المرضى، الردهات، الأدوية، واللجان العدلية..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none font-medium"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="px-2 py-0.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Domain Action Shortcuts */}
        <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium px-1 shrink-0">الانتقال:</span>
          <button
            onClick={() => handleAction('SEHR')}
            className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>السجل الطبي (S-EHR)</span>
          </button>
          <button
            onClick={() => handleAction('MLEGAL')}
            className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>اللجان العدلية</span>
          </button>
          <button
            onClick={() => handleAction('CAMPUS_CATERING')}
            className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5 text-slate-600" />
            <span>المطبخ والإعاشة</span>
          </button>
          <button
            onClick={() => {
              setIsCommandPaletteOpen(false);
              openBarcodeScanner();
            }}
            className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>ماسح الباركود</span>
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          {/* Patients Section */}
          {filteredPatients.length > 0 && (
            <div>
              <div className="text-[11px] font-medium text-slate-500 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>المرضى والنزلاء</span>
                </span>
                <span className="font-mono">{filteredPatients.length} نتائج</span>
              </div>
              <div className="space-y-1">
                {filteredPatients.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPatient(p.id)}
                    className="p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300 cursor-pointer flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.photo_url} 
                        alt={p.full_name} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                      />
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{p.full_name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 font-mono text-slate-600">
                            {p.archive_number}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          الأم: {p.mother_name} | الردهة: {p.ward_id} | سرير: {p.bed_number}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wards Section */}
          {filteredWards.length > 0 && (
            <div>
              <div className="text-[11px] font-medium text-slate-500 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Bed className="w-3.5 h-3.5 text-blue-600" />
                  <span>الردهات السريرية</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredWards.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => handleSelectWard(w.id)}
                    className="p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/80 cursor-pointer transition-colors shadow-2xs"
                  >
                    <div className="font-semibold text-slate-900">{w.arabic_name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {w.building_zone} | {w.occupied_beds}/{w.total_beds} سرير
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Controlled Drugs Section */}
          {filteredDrugs.length > 0 && (
            <div>
              <div className="text-[11px] font-medium text-slate-500 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Pill className="w-3.5 h-3.5 text-blue-600" />
                  <span>الأدوية الخاضعة للرقابة</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredDrugs.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelectDrug(d.id)}
                    className="p-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/80 cursor-pointer transition-colors shadow-2xs"
                  >
                    <div className="font-semibold text-slate-900">{d.generic_name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {d.brand_name} | رصيد: {d.total_stock}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
