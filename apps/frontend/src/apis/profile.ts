import { config } from '../config'
export default function profile () {
  async function getProfileInfo (token: string) {
    const response = await fetch(config.apiUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }

  async function updateInfo (token: string, data: any) {
    const response = await fetch(config.apiUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      },
      body: data
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }
  async function deleteProfile (token: string) {
    const response = await fetch(config.apiUri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }

  return {
    getProfileInfo,
    updateInfo,
    deleteProfile
  }
}
