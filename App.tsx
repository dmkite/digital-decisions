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

BackgroundTask.define(async (): Promise<void> => {
  console.log('FIRING')
  console.log('FIRING')
  console.log('FIRING')
  console.log('FIRING')

  await cronjob()
  BackgroundTask.finish()
})

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
