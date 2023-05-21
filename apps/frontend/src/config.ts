export const config = {

  firebaseApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  apiUri: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  countriesApi: import.meta.env.VITE_API_URL ?? 'https://restcountries.com/v2/all'
}
