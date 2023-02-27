import { type CreateDto } from '../models/api/profile.model'
import { type Validator } from '../models/validator.model'

export const rutDto: Validator = (value) => {
  const regex = /^\d{8}-\d$/

  if (regex.test(value)) {
    return true
  } else {
    return 'Rut invalido'
  }
}
export const phoneDto: Validator = (value) => {
  const regex = /^\d{8}$/
  if (regex.test(value)) {
    return true
  } else {
    return 'Debe tener 8 digitos'
  }
}
export const addressDto: Validator = (value) => {
  const regex = /(?=.*[a-zA-Z])(?=.*\d)/
  if (regex.test(value)) {
    return true
  } else {
    return 'Direccion no valida'
  }
}
export const avatarDto: Validator = (value) => {
  console.log(value)
  return true
}
export const birthdayDto: Validator = (value) => {
  console.log(value)
  const now = new Date()
  const birthdateObj = new Date(value)
  let age = now.getFullYear() - birthdateObj.getFullYear()
  if (
    now <
    new Date(now.getFullYear(), birthdateObj.getMonth(), birthdateObj.getDate())
  ) {
    age--
  }
  return age >= 18 ? true : 'should be more than 18 years old'
}
export const countryDto: Validator = () => {
  return true
}

export const validate = (data: Partial<CreateDto>) => {
  const { address, avatar, rut, phone, birthday, country } = data
  const errors = {
    avatar: avatarDto(avatar) == true ? false : avatarDto(avatar),
    rut: rutDto(rut) == true ? false : rutDto(rut),
    phone: phoneDto(phone) == true ? false : phoneDto(phone),
    birthday: birthdayDto(birthday) == true ? false : birthdayDto(birthday),
    country: countryDto(country) == true ? false : countryDto(country),
    address: addressDto(address) == true ? false : addressDto(address)
  }

  return errors
}
