import { AsyncStorage } from 'react-native'
import { NetInfo } from '@react-native-community/netinfo'
import axios from 'axios'

export const cronjob = async (): Promise<T> => {
  const isConnected = await checkConnectivity()
  if (!isConnected) return
  const responses: any[] = getFormResponses()
  if(!responses.length) return
}

const checkConnectivity = async (): Promise<boolean> => {
  try {
    const netInfo = await NetInfo.fetch()
    return netInfo.isInternetReachable
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

const getFormResponses = (): Promise<any[]> => {

}