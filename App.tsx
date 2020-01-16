import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import Story from './src/screens/Story'

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: 'fuck',
      mode: 'card',
      header: () => null
    })  },
  Story: {screen: Story}
})
const App = createAppContainer(MainNavigator)


export default App;
