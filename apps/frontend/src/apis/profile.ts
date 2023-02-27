import { config } from '../config'
 import {CreateDto} from '../models/api/profile.model'
export default function profile () {
  async function getProfileInfo (token: string) {
    const response = await fetch(config.apiUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    })
    const { error, data } = await response.json()
    if (error) {
      throw new Error(data.message)
    } else {
      return data
    }
  }
  async function addInfo (token: string, info: Partial<CreateDto>) {
    // console.log(token, info)
    // const response = await fetch(config.apiUri,{
    //     method:'POST',
    //     headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":token,

    //     },
    //     body:JSON.stringify(info)
    // })
    // const {error,data} = await response.json()
    // if (error) {
    //     throw new Error(data.message)
    // } else {
    //     return data
    // }
    console.log(token,info)
    return {
      message: 'datos actualizados'
    }
  }
  async function updateAllInfo (token: string, info: any) {
    const response = await fetch(config.apiUri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      },
      body: info
    })
    const { error, data } = await response.json()
    if (error) {
      throw new Error(data.message)
    } else {
      return data
    }
  }
  async function updateInfo (token: string, info: any) {
    const response = await fetch(config.apiUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      },
      body: info
    })
    const { error, data } = await response.json()
    if (error) {
      throw new Error(data.message)
    } else {
      return data
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
    const { error, data } = await response.json()
    if (error) {
      throw new Error(data.message)
    } else {
      return data
    }
  }

  return {
    getProfileInfo,
    addInfo,
    updateAllInfo,
    updateInfo,
    deleteProfile
  }
}
