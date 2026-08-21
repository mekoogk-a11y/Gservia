import { SystemCurrency, SystemTimezone } from '../types';

export const SYSTEM_CURRENCIES: SystemCurrency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAr: 'يورو أوروبي' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', nameAr: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', nameAr: 'درهم إماراتي' },
  { code: 'SDG', symbol: 'ج.س', name: 'Sudanese Pound', nameAr: 'جنيه سوداني' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound', nameAr: 'جنيه مصري' },
  { code: 'GBP', symbol: '£', name: 'British Pound', nameAr: 'جنيه إسترليني' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', nameAr: 'ين ياباني' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', nameAr: 'دولار كندي' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', nameAr: 'دولار أسترالي' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', nameAr: 'فرنك سويسري' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', nameAr: 'ريال قطري' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي' },
];

export const SYSTEM_TIMEZONES: SystemTimezone[] = [
  { id: 'UTC+03:00', name: 'Riyadh / Khartoum / Cairo / Nairobi (UTC+3)', offset: '+03:00' },
  { id: 'UTC+04:00', name: 'Dubai / Abu Dhabi / Muscat (UTC+4)', offset: '+04:00' },
  { id: 'UTC+00:00', name: 'London / Casablanca / UTC / GMT (UTC+0)', offset: '+00:00' },
  { id: 'UTC+01:00', name: 'Paris / Berlin / Rome / Algiers / Tunis (UTC+1)', offset: '+01:00' },
  { id: 'UTC+02:00', name: 'Johannesburg / Athens / Beirut (UTC+2)', offset: '+02:00' },
  { id: 'UTC-05:00', name: 'New York / Toronto / Eastern Time (UTC-5)', offset: '-05:00' },
  { id: 'UTC-08:00', name: 'San Francisco / Los Angeles / Pacific Time (UTC-8)', offset: '-08:00' },
  { id: 'UTC+05:30', name: 'India Standard Time / Mumbai / New Delhi (UTC+5:30)', offset: '+05:30' },
  { id: 'UTC+08:00', name: 'Singapore / Hong Kong / Beijing / Perth (UTC+8)', offset: '+08:00' },
  { id: 'UTC+09:00', name: 'Tokyo / Seoul (UTC+9)', offset: '+09:00' },
  { id: 'UTC+10:00', name: 'Sydney / Melbourne (UTC+10)', offset: '+10:00' },
];
