import { AsyncStorage } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import queryString from 'query-string'
import { IFormVals } from '../screens/Form'

const getUrl: string = ''
const postUrl: string = ''

export const cronjob = async (): Promise<void> => {
  const isConnected = await checkConnectivity()
  if (!isConnected) return
  await getAndSend('form-responses', getUrl, 'get')
  await getAndSend('errors', postUrl, 'post')
}

const getAndSend = async (asyncStorageKey: string, baseUrl: string, method: string) => {
  try {
    const storedVals: string | null = await AsyncStorage.getItem(asyncStorageKey)
    const parsedVals: IError[] | IFormVals[] = storedVals ? JSON.parse(storedVals) : []
    if(!parsedVals.length) return
    parsedVals.forEach(async (v: IError | IFormVals) => {
      if(method === 'get') {
        const params = constructParams(v)
        await axios.get(`${baseUrl}/?${params}`)
      } else {
        await axios.post(baseUrl, JSON.stringify(v))
      }
    })
  } catch(err) {
    storeErrors(err)
  }
}

const checkConnectivity = async (): Promise<boolean> => {
  try {
    const netInfo = await NetInfo.fetch()
    return Boolean(netInfo.isInternetReachable)
  }catch(err) {
    await storeErrors(err)
    return false
  }
}

interface IError {
  timestamp: number
  message: string
  stack: string
}


export const storeErrors = async (error: Error): Promise<boolean> => {
  try {
    const errors: string | null = await AsyncStorage.getItem('errors')
    const parsedErrors: IError[] = errors ? JSON.parse(errors) : []
    const formattedError: IError = {
      timestamp: Date.now(),
      message: error.message,
      stack: String(error.stack)
    }
    parsedErrors.push(formattedError)
    await AsyncStorage.setItem('errors', JSON.stringify(parsedErrors))
    return true
  } catch(err) {  
    return false
  }
}

const constructParams = (response:any): string => {
  const paramObj = Object.keys(response).reduce((acc: {[key:string]: string}, k) => {
    const entries = response[k]
    Object.keys(entries).forEach(subKey => {
      const topicAndQuestion: string = k + subKey
      acc[topicAndQuestion] = entries[subKey]
    })
    return acc
  }, {})
  return queryString.stringify(paramObj)
}