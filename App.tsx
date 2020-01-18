import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import Story from './src/screens/Story'
import { Provider } from 'react-redux'
import React from 'react'
import store from './src/store'

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
  }
})

const AppContainer = createAppContainer(MainNavigator)

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;
