export interface CountryOption {
  code: string;       // ISO 3166-1 alpha-2
  name: string;
  dialCode: string;
}

// Converts ISO country code to flag emoji using regional indicator symbols
function codeToFlag(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)));
}

// Minimal curated list of countries relevant to DOYEN's market
export const countries: CountryOption[] = [
  { code: 'PH', name: 'Philippines',       dialCode: '+63' },
  { code: 'US', name: 'United States',     dialCode: '+1' },
  { code: 'JP', name: 'Japan',             dialCode: '+81' },
  { code: 'CN', name: 'China',             dialCode: '+86' },
  { code: 'KR', name: 'South Korea',       dialCode: '+82' },
  { code: 'IN', name: 'India',             dialCode: '+91' },
  { code: 'SG', name: 'Singapore',         dialCode: '+65' },
  { code: 'MY', name: 'Malaysia',          dialCode: '+60' },
  { code: 'ID', name: 'Indonesia',         dialCode: '+62' },
  { code: 'TH', name: 'Thailand',          dialCode: '+66' },
  { code: 'VN', name: 'Vietnam',           dialCode: '+84' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia',      dialCode: '+966' },
  { code: 'AU', name: 'Australia',         dialCode: '+61' },
  { code: 'GB', name: 'United Kingdom',    dialCode: '+44' },
  { code: 'DE', name: 'Germany',           dialCode: '+49' },
  { code: 'FR', name: 'France',            dialCode: '+33' },
  { code: 'CA', name: 'Canada',            dialCode: '+1' },
  { code: 'BR', name: 'Brazil',            dialCode: '+55' },
  { code: 'MX', name: 'Mexico',            dialCode: '+52' },
  { code: 'NG', name: 'Nigeria',           dialCode: '+234' },
  { code: 'ZA', name: 'South Africa',      dialCode: '+27' },
  { code: 'EG', name: 'Egypt',             dialCode: '+20' },
  { code: 'TR', name: 'Turkey',            dialCode: '+90' },
  { code: 'BD', name: 'Bangladesh',        dialCode: '+880' },
  { code: 'PK', name: 'Pakistan',          dialCode: '+92' },
  { code: 'KH', name: 'Cambodia',          dialCode: '+855' },
  { code: 'MM', name: 'Myanmar',           dialCode: '+95' },
  { code: 'TW', name: 'Taiwan',            dialCode: '+886' },
  { code: 'HK', name: 'Hong Kong',         dialCode: '+852' },
  { code: 'NZ', name: 'New Zealand',       dialCode: '+64' },
  { code: 'QA', name: 'Qatar',             dialCode: '+974' },
  { code: 'KW', name: 'Kuwait',            dialCode: '+965' },
  { code: 'OM', name: 'Oman',              dialCode: '+968' },
  { code: 'BH', name: 'Bahrain',           dialCode: '+973' },
  { code: 'IL', name: 'Israel',            dialCode: '+972' },
  { code: 'IT', name: 'Italy',             dialCode: '+39' },
  { code: 'ES', name: 'Spain',             dialCode: '+34' },
  { code: 'NL', name: 'Netherlands',       dialCode: '+31' },
  { code: 'RU', name: 'Russia',            dialCode: '+7' },
  { code: 'PK', name: 'Pakistan',          dialCode: '+92' },
  { code: 'LK', name: 'Sri Lanka',         dialCode: '+94' },
  { code: 'NP', name: 'Nepal',             dialCode: '+977' },
].filter((c, i, arr) => arr.findIndex((x) => x.code === c.code) === i); // dedupe by code

export function getCountryByCode(code: string): CountryOption | undefined {
  return countries.find((c) => c.code === code);
}

export function getFlag(code: string): string {
  return codeToFlag(code);
}
