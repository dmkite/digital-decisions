import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import Story from './src/screens/Story'
import { Provider } from 'react-redux'
import Form from './src/screens/Form'
import React, {useEffect} from 'react'
import store from './src/store'
import {cronjob} from './src/utils/cronJob'
import BackgroundTask from 'react-native-background-task'
import AsyncStorage from '@react-native-community/async-storage'

BackgroundTask.define(async (): Promise<void> => {
  console.log('FIRING')
  console.log('FIRING')
  console.log('FIRING')
  console.log('FIRING')

  await cronjob()
  BackgroundTask.finish()
})

const x = async () => {
  console.log('about to get async storage')
  try {
    const vals = await AsyncStorage.getItem('form-results')
    console.log(vals)
  } catch(e) {
    console.error(e)
  }
  console.log('storage access complete')
}

setInterval(x, 10000)

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  },
  Story: { 
    screen: Story,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    }) 
  },
  Form: {
    screen: Form,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    }) 
  }
})

const AppContainer = createAppContainer(MainNavigator)

const App = () => {
  useEffect(() => BackgroundTask.schedule({period: 900}))
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;
