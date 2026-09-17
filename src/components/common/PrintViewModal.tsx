import React from 'react';
import { Printer, X, Stamp } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const PrintViewModal: React.FC = () => {
  const { activePrintDoc, closePrintDocument, patients, selectedPatientId, wards } = useHospital();

  if (!activePrintDoc) return null;

  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      {/* Container */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden my-8 flex flex-col print:m-0 print:p-0 print:shadow-none print:w-full print:rounded-none">
        
        {/* On-screen control bar */}
        <div className="no-print bg-slate-50 text-slate-800 p-3.5 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{activePrintDoc.title}</h3>
              <p className="text-xs text-slate-500">معاينة المستند الرسمي المعتمد للطباعة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المستند</span>
            </button>
            <button
              onClick={closePrintDocument}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="p-8 sm:p-12 text-black bg-white min-h-[600px] flex flex-col justify-between print:p-6" dir="rtl">
          {/* Official Ministry Letterhead */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
              <div className="text-right text-xs leading-relaxed font-semibold">
                <div>جمهورية العراق</div>
                <div>وزارة الصحة</div>
                <div>دائرة صحة بغداد / الرصافة</div>
                <div>مستشفى الرشاد التدريبي للأمراض العقلية</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto border-2 border-black rounded-full flex items-center justify-center font-bold text-xs p-1 mb-1">
                  وزارة الصحة
                </div>
                <div className="text-[11px] font-bold">تأسس 1952</div>
              </div>

              <div className="text-left text-xs font-mono leading-relaxed font-semibold" dir="ltr">
                <div>Republic of Iraq</div>
                <div>Ministry of Health</div>
                <div>Baghdad Health Directorate - Rusafa</div>
                <div>Al-Rashad Psychiatric Teaching Hospital</div>
              </div>
            </div>

            {/* Document Specific Body */}
            {activePrintDoc.type === 'MEAL_MANIFEST' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-bold underline underline-offset-4 mb-1">
                    مانيفست إعاشة الردهات اليومي - المطبخ المركزي
                  </h2>
                  <p className="text-xs font-medium text-gray-700">
                    جدول مطابقة الوجبات الأربع اليومية (إجمالي الحرم: 6,000 وجبة / 1,500 نزيل)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs bg-gray-50 p-3 border border-gray-300 rounded font-medium">
                  <div>التاريخ: {new Date().toLocaleDateString('ar-IQ')}</div>
                  <div>المناوبة: الصباحية (07:00 - 15:00)</div>
                  <div>إشراف: السيد عماد عادل السامرائي</div>
                </div>

                <table className="w-full text-xs border-collapse border border-black text-center">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2">اسم الردهة</th>
                      <th className="border border-black p-2">اعتيادي</th>
                      <th className="border border-black p-2">حمية سكري</th>
                      <th className="border border-black p-2">قليل الملح</th>
                      <th className="border border-black p-2">طعام مهروس</th>
                      <th className="border border-black p-2 font-bold">المجموع</th>
                      <th className="border border-black p-2">حرارة الطعام</th>
                      <th className="border border-black p-2">توقيع المستلم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wards.slice(0, 8).map((w) => {
                      const norm = Math.floor(w.occupied_beds * 0.7);
                      const diab = Math.floor(w.occupied_beds * 0.18);
                      const sod = Math.floor(w.occupied_beds * 0.08);
                      const pur = Math.floor(w.occupied_beds * 0.04);
                      return (
                        <tr key={w.id}>
                          <td className="border border-black p-1.5 text-right font-semibold">{w.arabic_name}</td>
                          <td className="border border-black p-1.5 font-mono">{norm}</td>
                          <td className="border border-black p-1.5 font-mono">{diab}</td>
                          <td className="border border-black p-1.5 font-mono">{sod}</td>
                          <td className="border border-black p-1.5 font-mono">{pur}</td>
                          <td className="border border-black p-1.5 font-bold font-mono">{norm + diab + sod + pur}</td>
                          <td className="border border-black p-1.5 font-mono">75.0°C</td>
                          <td className="border border-black p-1.5 text-gray-400 font-mono text-[10px]">م. التمريض</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="text-xs space-y-1 bg-gray-50 p-2.5 border border-gray-300">
                  <span className="font-bold">تعليمات سلامة الغذاء ونظافة الأواني:</span>
                  <p>1. يُمنع منعاً باتاً تزويد الردهات الحادة والعدلية بملاعق أو أدوات معدنية، والاعتماد حصراً على الملاعق البلاستيكية الآمنة.</p>
                  <p>2. يتم حصر وجبات المرضى ذوي صعوبة البلع (المهروسة) والإشراف المباشر أثناء الإطعام من قبل كادر الردهة.</p>
                </div>
              </div>
            )}

            {activePrintDoc.type === 'FORENSIC_REPORT' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-bold underline underline-offset-4 mb-1">
                    تقرير اللجنة الطبية النفسية العدلية (الخماسية)
                  </h2>
                  <p className="text-xs font-mono font-medium">رقم التقرير: REP-MOJ-IRQ-2026-8491</p>
                </div>

                <div className="text-xs leading-relaxed space-y-3">
                  <p>
                    <strong>إلى / رئاسة محكمة استئناف بغداد الرصافة الاتحادية - محكمة الجنايات الأولى</strong>
                  </p>
                  <p>
                    بناءً على كتابكم ذي العدد <strong>(1428/جنايات/2021)</strong>، اجتمعت اللجنة الطبية النفسية العدلية برئاسة 
                    <strong> د. عمار فاروق الجنابي (استشاري الطب النفسي العدلي)</strong> وعضوية أربعة أطباء استشاريين واختصاص، 
                    لفحص المتهم المودع:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs border border-black p-3 bg-gray-50">
                  <div><strong>اسم المودع الرباعي:</strong> {currentPatient.full_name}</div>
                  <div><strong>اسم الأم:</strong> {currentPatient.mother_name}</div>
                  <div><strong>رقم الأرشيف بمستشفى الرشاد:</strong> {currentPatient.archive_number}</div>
                  <div><strong>المادة القانونية المحال بموجبها:</strong> المادة 78 عقوبات (إيداع وقائي)</div>
                </div>

                <div className="text-xs space-y-2 leading-relaxed">
                  <div className="font-bold underline">القرار والتوصية الطبية العدلية:</div>
                  <p className="p-3 border border-dashed border-black bg-gray-50 text-justify">
                    بعد الفحص السريري وتطبيق مقياس الحالة العقلية والملاحظة المستمرة في الردهة الرابعة العدلية، 
                    تبين أن المفحوص يعاني من <strong>الفصام البارانويدي المزمن (Chronic Paranoid Schizophrenia)</strong> مع ضلالات 
                    اضطهادية وهلاوس سمعية. وعليه، فإن المذكور كان <strong>فاقداً للأهلية والإدراك وحرية الاختيار وقت ارتكاب الفعل</strong>، 
                    ولما كان يشكل خطورة على السلامة العامة، توصي اللجنة <strong>باستمرار إيداعه في مأوى احترازي للمصابين بعاهة عقلية بمستشفى الرشاد</strong> 
                    عملاً بأحكام المادة 78 من قانون العقوبات العراقي رقم 111 لسنة 1969 المعدل.
                  </p>
                </div>
              </div>
            )}

            {activePrintDoc.type === 'EMAR_CHART' && (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-lg font-bold underline mb-1">
                    سجل إعطاء الدواء التمريضي (24 ساعة)
                  </h2>
                  <p className="text-xs">ردهة: 4 (الطب النفسي العدلي) - المريض: {currentPatient.full_name}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs border border-black p-2">
                  <div>المريض: {currentPatient.full_name}</div>
                  <div>الأرشيف: {currentPatient.archive_number}</div>
                  <div>السرير: {currentPatient.bed_number}</div>
                </div>

                <table className="w-full text-xs border-collapse border border-black text-center">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2">الدواء</th>
                      <th className="border border-black p-2">الجرعة والطريق</th>
                      <th className="border border-black p-2">الوقت</th>
                      <th className="border border-black p-2">الحالة</th>
                      <th className="border border-black p-2">الممرض المنفذ</th>
                      <th className="border border-black p-2">الممرض الشاهد</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-2 text-right font-medium">Clozapine 100mg Tab</td>
                      <td className="border border-black p-2">100mg PO</td>
                      <td className="border border-black p-2">08:00</td>
                      <td className="border border-black p-2 text-emerald-700 font-medium">أُعطي (GIVEN)</td>
                      <td className="border border-black p-2">م. كاظم عيسى</td>
                      <td className="border border-black p-2">م. ثائر محمود</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 text-right font-medium">Haloperidol Decanoate 100mg</td>
                      <td className="border border-black p-2">100mg IM Depot</td>
                      <td className="border border-black p-2">10:00</td>
                      <td className="border border-black p-2 text-blue-700 font-medium">مجدول اليوم</td>
                      <td className="border border-black p-2">---</td>
                      <td className="border border-black p-2">---</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Official Seals and Signatures Footer */}
          <div className="pt-8 border-t border-black mt-8">
            <div className="grid grid-cols-3 gap-8 text-center text-xs">
              <div>
                <div className="font-bold mb-10">منظم السجل / المشرف</div>
                <div className="border-t border-dotted border-black pt-1">التوقيع والاسم الثلاثي</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-dashed border-red-700 rounded-full flex flex-col items-center justify-center text-[10px] text-red-700 font-bold p-1 transform rotate-[-6deg]">
                  <Stamp className="w-5 h-5 mb-0.5" />
                  <span>ختم المستشفى الرسمي</span>
                  <span>جمهورية العراق</span>
                </div>
              </div>

              <div>
                <div className="font-bold mb-10">مدير مستشفى الرشاد التدريبي</div>
                <div className="border-t border-dotted border-black pt-1">د. مصطفى حميد الزبيدي</div>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 text-center mt-6 font-mono">
              مستشفى الرشاد التدريبي للأمراض العقلية | تاريخ الطباعة: {new Date().toLocaleString('ar-IQ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
