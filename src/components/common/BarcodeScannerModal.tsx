import React, { useState } from 'react';
import { 
  Scan, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Camera,
  RefreshCw
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const BarcodeScannerModal: React.FC = () => {
  const { 
    isScannerOpen, 
    setIsScannerOpen, 
    patients, 
    emarRecords, 
    recordMedicationAdministration,
    scannerTargetAction,
    setSelectedPatientId,
    setActiveDomain
  } = useHospital();

  const [inputCode, setInputCode] = useState('');
  const [scanStatus, setScanStatus] = useState<'IDLE' | 'SCANNING' | 'MATCH_PATIENT' | 'MATCH_MEDICATION' | 'ERROR'>('IDLE');
  const [matchedPatient, setMatchedPatient] = useState<any>(null);
  const [matchedEmar, setMatchedEmar] = useState<any>(null);
  const [witnessName, setWitnessName] = useState('ممرض جامعي ثائر محمود');

  if (!isScannerOpen) return null;

  const handleSimulateScan = (codeToScan: string) => {
    setInputCode(codeToScan);
    setScanStatus('SCANNING');

    setTimeout(() => {
      // 1. Check if patient barcode
      const patientMatch = patients.find(p => p.id === codeToScan || p.archive_number === codeToScan);
      if (patientMatch) {
        setMatchedPatient(patientMatch);
        setMatchedEmar(null);
        setScanStatus('MATCH_PATIENT');
        if (scannerTargetAction) scannerTargetAction(codeToScan);
        return;
      }

      // 2. Check if medication barcode
      const emarMatch = emarRecords.find(e => e.barcode === codeToScan || e.id === codeToScan);
      if (emarMatch) {
        setMatchedEmar(emarMatch);
        const relatedPatient = patients.find(p => p.id === emarMatch.patient_id);
        setMatchedPatient(relatedPatient || null);
        setScanStatus('MATCH_MEDICATION');
        if (scannerTargetAction) scannerTargetAction(codeToScan);
        return;
      }

      setScanStatus('ERROR');
    }, 400);
  };

  const handleConfirmAdministration = () => {
    if (matchedEmar) {
      recordMedicationAdministration(matchedEmar.id, 'GIVEN', witnessName);
      setScanStatus('IDLE');
      setIsScannerOpen(false);
    }
  };

  const handleOpenPatientRecord = () => {
    if (matchedPatient) {
      setSelectedPatientId(matchedPatient.id);
      setActiveDomain('SEHR');
      setIsScannerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                قارئ الباركود السريري
              </h3>
              <p className="text-xs text-slate-500">
                التحقق من سوار معصم المريض أو عبوة الدواء المقيد
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsScannerOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Simulator */}
        <div className="p-5 bg-white flex flex-col items-center justify-center border-b border-slate-100">
          <div className="w-64 h-36 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 relative">
            <div className="text-center p-4">
              <Camera className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
              <p className="text-xs text-slate-500">
                وجّه قارئ الباركود نحو كود السوار أو ملصق الدواء
              </p>
            </div>
          </div>

          {/* Quick Simulation Options */}
          <div className="w-full mt-4">
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5 text-right">
              أمثلة للاختبار المباشر:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleSimulateScan('RSH-1994-01842')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                سوار: جاسم محمد كاظم
              </button>
              <button
                onClick={() => handleSimulateScan('BC-CLZ-100-8491')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                دواء: Clozapine 100mg
              </button>
              <button
                onClick={() => handleSimulateScan('BC-DZP-10-8812')}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                حقنة: Diazepam 10mg
              </button>
            </div>
          </div>
        </div>

        {/* Scan Result Output */}
        <div className="p-4 bg-slate-50 space-y-3 text-xs">
          {scanStatus === 'SCANNING' && (
            <div className="flex items-center justify-center gap-2 text-blue-700 text-xs py-3">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>جاري التحقق من الرمز...</span>
            </div>
          )}

          {scanStatus === 'MATCH_PATIENT' && matchedPatient && (
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم التعرف على سوار المريض</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={matchedPatient.photo_url} alt="" className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{matchedPatient.full_name}</div>
                  <div className="text-xs text-slate-500">الأرشيف: {matchedPatient.archive_number} | الردهة: {matchedPatient.ward_id} (سرير {matchedPatient.bed_number})</div>
                  <div className="text-[11px] text-slate-600">الحمية الغذائية: {matchedPatient.dietary_type}</div>
                </div>
              </div>
              <button
                onClick={handleOpenPatientRecord}
                className="w-full mt-2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                فتح السجل الطبي للمريض
              </button>
            </div>
          )}

          {scanStatus === 'MATCH_MEDICATION' && matchedEmar && (
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>دواء مطابق للجدول الدوائي</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                  دواء مقيد
                </span>
              </div>

              <div className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-md border border-slate-200">
                <div className="text-slate-900 font-semibold">{matchedEmar.medication_name}</div>
                <div className="text-slate-600">الجرعة: {matchedEmar.dosage} | طريق الإعطاء: {matchedEmar.route}</div>
                <div className="text-slate-600">المريض: <strong className="text-slate-800">{matchedEmar.patient_name}</strong></div>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">
                  الممرض الشاهد:
                </label>
                <input
                  type="text"
                  value={witnessName}
                  onChange={(e) => setWitnessName(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-md px-2.5 py-1.5"
                />
              </div>

              <button
                onClick={handleConfirmAdministration}
                className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-2xs transition-colors cursor-pointer"
              >
                تأكيد إعطاء الجرعة وسحبها من رصيد الردهة
              </button>
            </div>
          )}

          {scanStatus === 'ERROR' && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>الرمز الممسوح ({inputCode}) غير مطابق لأي مريض أو جرعة مجدولة!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
