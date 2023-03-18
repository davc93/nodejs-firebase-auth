import { config } from '../config'

export const getCountries = async () => {
  const response = await fetch(config.countriesApi, {
    method: 'GET'
  })
  const data = await response.json()
  if (false) {
    throw new Error(data.message)
  } else {
    // console.log(data)
    return data
  }
}
