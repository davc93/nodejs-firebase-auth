import auth from './auth/auth'
import { navigation, renderPage, setElements } from './navigation'
import { type User } from './models/user.model'
import {
  loginForm,
  signUpForm,
  loginMessage,
  signupMessage,
  links,
  logout,
  googleButtons,
  emailAccount,
  profileForm,
  profileMessage,
  profileSelectLabel
} from './nodes'
import { getCountries } from './apis/countries'
import { type Country } from './models/api/country.model'
import { insertLoader } from './loader'
import { type CreateDto } from './models/api/profile.model'
import profile from './apis/profile'
import { validate } from './dtos'
export const globalUser: User = {
  email: null,
  token: null,
  isVerified: null,
  darkMode: false
}
const api = profile()
window.addEventListener('DOMContentLoaded', renderPage)
auth.authObserver(async (user: any) => {
  if (user?.emailVerified) {
    const { accessToken, email } = user
    globalUser.email = email
    globalUser.token = accessToken
    globalUser.isVerified = true
    setElements(globalUser)
    emailAccount.textContent = globalUser.email
  } else {
    emailAccount.textContent = null
    setElements(globalUser)
    console.log('you have to login')
  }
})

links.forEach((anchor: HTMLAnchorElement) => {
  anchor.addEventListener('click', (event: any) => {
    event.preventDefault()
    const url = event.target.href
    // console.log(url)
    navigation(url)
  })
})

loginForm?.addEventListener('submit', async (event: any) => {
  event.preventDefault()
  const email = event.target.email.value
  const password = event.target.password.value
  const loader = insertLoader() as HTMLButtonElement
  loginForm.querySelector('button')?.append(loader)
  try {
    const userCredentials = await auth.loginEmailAndPassword(email, password)
    const { user }: any = userCredentials
    const { accessToken, emailVerified } = user
    

    if (emailVerified) {
      globalUser.email = email
      globalUser.token = accessToken
      globalUser.isVerified = true
      setElements(globalUser)
      emailAccount.textContent = globalUser.email
      event.target.reset()

      navigation('/profile')
      loginMessage.textContent = null
    } else {
      throw new Error('Debes Verificar tu email')
    }
  } catch (error) {
    loginMessage.textContent = `${error}`
  }

  loader.remove()
})
signUpForm?.addEventListener('submit', async (event: any) => {
  event.preventDefault()
  const loader = insertLoader() as HTMLButtonElement
  signUpForm.querySelector('button')?.append(loader)

  const email = event.target.email.value
  const password = event.target.password.value
  try {
    const userCredentials = await auth.signUpEmailAndPassword(email, password)
    await auth.sendVerificationEmail(userCredentials.user)
    const { user } = userCredentials
    signupMessage.textContent = `Sign Up Successfull we send email to ${user.email} to verified your account`
    event.target.reset()
  } catch (error) {
    console.error(error)
    signupMessage.textContent = `${error}`
  }
  loader.remove()
})

logout?.addEventListener('click', async () => {
  try {
    await auth.logout()
    navigation('/')
    console.log('logout succesfull')
  } catch (error) {
    console.error(error)
  }
})

googleButtons.forEach((button) => {
  button?.addEventListener('click', async (event) => {
    const loader = insertLoader()
    button.append(loader)
    event.preventDefault()
    try {
      await auth.google()
      setElements(globalUser)
      emailAccount.textContent = globalUser.email
      loader.remove()
      loginMessage.textContent = null
      signupMessage.textContent = null
      navigation('/profile')
    } catch (error) {
      console.error(error)
    }
    loader.remove()
  })
})

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  profileMessage.textContent = null
  const loader = insertLoader() as HTMLButtonElement
  profileForm.querySelector('button')?.append(loader)
  profileMessage.textContent = null
  const target = event.target as HTMLFormElement
  const phone = target?.phone.value
  const rut = target?.rut.value
  const address = target?.address.value

  const avatar = target?.avatar.value

  const birthday = target?.birthday.value

  const country = target?.country.value

  const data: Partial<CreateDto> = {
    phone,
    rut,
    address,
    birthday,
    country,
    avatar
  }

  const errors = validate(data)

  const entries = Object.entries(errors)

  if (
    entries.some((item) => {
      return item[1] !== false
    })
  ) {
    entries.forEach((entry) => {
      if (entry[1]) {
        const error = document.createElement('span')
        error.textContent = `${entry[0]} :${entry[1]}`
        profileMessage.append(error)
      }
    })
  } else {
    try {
      await api.updateInfo(globalUser.token as string, data)
      target.reset()
      profileMessage.textContent = 'All Done'
    } catch (error) {
      profileMessage.textContent = `${error}`
    }
  }

  loader.remove()
})

getCountries().then((countries: Country[]) => {
  const select = document.createElement('select')
  select.name = 'country'
  select.id = 'profile-form__select'
  countries.forEach((country) => {
    const option = document.createElement('option')
    option.value = country.name
    option.textContent = country.name
    select.append(option)
  })
  // console.log(profileSelectLabel)
  profileSelectLabel.insertAdjacentElement('afterend', select)
})
