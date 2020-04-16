import AsyncStorage from '@react-native-community/async-storage'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import { IFormVals } from '../screens/Form'

const postUrl: string = 'https://script.google.com/macros/s/AKfycbze55LkWgLwOUDYON8OE8Z91xL5HVqxk8146fesgMdx1dSxmE00/exec'

export const cronjob = async (): Promise<string> => {
  const isConnected = await checkConnectivity()
  if (!isConnected) return 'No internet connection.'
  const response = await getAndSend('form-results', postUrl)
  return response
}

const getAndSend = async (asyncStorageKey: string, url: string) => {
  try {
    const storedVals: string | null = await AsyncStorage.getItem(asyncStorageKey)
    const parsedVals: IError[] | IFormVals[] = storedVals ? JSON.parse(storedVals) : []
    if(!parsedVals.length) return 'No form responses to submit'
    await axios({
      method: 'post',
      url,
      data: parsedVals
    })
    AsyncStorage.removeItem(asyncStorageKey)
    return `Successfully sent ${parsedVals.length} form response${parsedVals.length > 1 ? 's': ''}`
  } catch(err) {
    console.error(err.message)
    storeErrors(err)
    return `Something went wrong.`
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

// TODO: implement this in a separate google sheet that I control
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