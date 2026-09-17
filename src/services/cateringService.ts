import { WardInfo, MealManifest, DietaryType } from '../types';

export class CateringService {
  static calculateWardMealSummary(wards: WardInfo[]): {
    totalMeals: number;
    dietaryBreakdown: Record<DietaryType, number>;
  } {
    const dietaryBreakdown: Record<DietaryType, number> = {
      STANDARD_DIET: 0,
      DIABETIC: 0,
      LOW_SODIUM_RENAL: 0,
      PUREED_DYSPHAGIA: 0,
      HIGH_CALORIE_PSYCH: 0
    };

    let totalOccupants = 0;

    wards.forEach(ward => {
      totalOccupants += ward.occupied_beds;
      dietaryBreakdown.STANDARD_DIET += Math.floor(ward.occupied_beds * 0.70);
      dietaryBreakdown.DIABETIC += Math.floor(ward.occupied_beds * 0.18);
      dietaryBreakdown.LOW_SODIUM_RENAL += Math.floor(ward.occupied_beds * 0.08);
      dietaryBreakdown.PUREED_DYSPHAGIA += Math.floor(ward.occupied_beds * 0.04);
    });

    return {
      totalMeals: totalOccupants * 4,
      dietaryBreakdown
    };
  }

  static validateHotHoldingTemp(tempCelsius: number): { safe: boolean; note: string } {
    if (tempCelsius >= 65) {
      return { safe: true, note: 'مطابق للمعيار الصحي لنقل وتوزيع الأطعمة الساخنة' };
    }
    return { safe: false, note: 'تحذير: درجة الحرارة أقل من 65°C، خطر تلوث بكتيري وفق اشتراطات الرقابة الصحية' };
  }
}
