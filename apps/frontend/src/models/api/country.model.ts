export interface Country {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  subregion: string
  region: string
  population: number
  latlng: number[]
  demonym: string
  area: number
  timezones: string[]
  borders: string[]
  nativeName: string
  numericCode: string
  flags: Flags
  currencies: Currency[]
  languages: Language[]
  translations: Translations
  flag: string
  regionalBlocs: RegionalBloc[]
  cioc: string
  independent: boolean
}

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface Flags {
  svg: string
  png: string
}

export interface Language {
  iso6391: string
  iso6392: string
  name: string
  nativeName: string
}

export interface RegionalBloc {
  acronym: string
  name: string
}

export interface Translations {
  br: string
  pt: string
  nl: string
  hr: string
  fa: string
  de: string
  es: string
  fr: string
  ja: string
  it: string
  hu: string
}
